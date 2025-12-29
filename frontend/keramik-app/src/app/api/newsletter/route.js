import { NextResponse } from 'next/server';
import sql from 'mssql';
import { sendNewsletterEmail } from '../../../lib/services/mail';

// her defineres konfigurationen til at forbinde til SQL Server databasen
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  // pool definerer forbindelses pool, max 10, min 0 forbindelser.
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// her håndteres POST requests til /api/newsletter
export async function POST(request) {
  let transaction;

  // her begynder vi at behandle tilmeldingen
  try {
    const { email } = await request.json();

    // Backend validering
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Ugyldigt email format' }, { status: 400 });
    }

    // Start Transaction
    const pool = await sql.connect(sqlConfig);
    transaction = new sql.Transaction(pool);
    await transaction.begin();

    // Opret Request bundet til transaktionen
    const dbRequest = new sql.Request(transaction);

    // Database Insert
    // xtype='U' betyder "user table", da sysobjects også indeholder views, procs osv. så specificerer vi at det er et user table, vi vil arbejde med
    const query = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='NewsletterSubscribers' AND xtype='U')
      BEGIN
          CREATE TABLE NewsletterSubscribers (
              Id INT IDENTITY(1,1) PRIMARY KEY,
              Email NVARCHAR(255) NOT NULL UNIQUE,
              CreatedAt DATETIME DEFAULT GETDATE()
          )
      END

      INSERT INTO NewsletterSubscribers (Email) VALUES (@emailParam)
    `;

    // Brug parameterized query for at undgå SQL Injection
    await dbRequest.input('emailParam', sql.NVarChar, email).query(query);

    // Send bekræftelsesmail
    const mailResult = await sendNewsletterEmail(email);

    // Tjek om mail blev sendt korrekt
    if (!mailResult.success) {
      throw new Error(`Kunne ikke sende mail: ${mailResult.error}`);
    }

    // Commit
    await transaction.commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    // Rollback ved fejl
    if (transaction) {
      try {
        await transaction.rollback();
        // eslint-disable-next-line no-unused-vars
      } catch (rollbackError) {
        // Ignorer rollback fejl, det kan ske fx hvis transaktionen aldrig blev startet
      }
    }

    // eslint-disable-next-line no-console
    console.error('Fejl under tilmelding:', error);

    // hvis email allerede findes (fejlkode 2627),
    if (error.number === 2627) {
      return NextResponse.json({ error: 'Du er allerede tilmeldt!' }, { status: 409 });
    }

    // generel fejl
    return NextResponse.json(
      { error: 'Kunne ikke gennemføre tilmelding (Email eller DB fejlede)' },
      { status: 500 }
    );
  }
}
