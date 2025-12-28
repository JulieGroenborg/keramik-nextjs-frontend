'use client';
// Vi har fjernet useState herfra, da komponenten nu styres af andre parent komponenter (ProductActions, CartItem)
import styles from '../css/components/QuantityControl.module.css';

export default function QuantityControl({ stock, value, onChange }) {
  // Hvis lageret er mindre eller lig 0, returnerer vi null. Det svarer til "display: none", men fjerner elementet helt fra siden.
  if (stock <= 0) {
    return null;
  }

  const handleDecrement = () => {
    // Vi tjekker mod 'value' fra props i stedet for intern state
    // Vi bruger Number() for at sikre korrekt matematisk sammenligning
    if (Number(value) > 1) {
      const newQuantity = Number(value) - 1;
      if (onChange) onChange(newQuantity);
    }
  };

  const handleIncrement = () => {
    // value er props som lever på tværs af komponenter, så vi tjekker mod den og tilføjer 1
    // Det skal gøres via prop så tallet kan leve på tværs af komponenter så useState er ikke en option, så det samme levende tal kan bruges i AddToBasket og knappen osv.
    if (Number(value) < Number(stock)) {
      const newQuantity = Number(value) + 1;
      if (onChange) onChange(newQuantity);
    }
  };

  return (
    <div className={styles.stepper}>
      <button
        type="button"
        onClick={handleDecrement}
        className={styles.stepperBtn}
        disabled={Number(value) <= 1}
      >
        -
      </button>

      {/* Vi viser nu værdien direkte fra ProductActions state, altså value */}
      <span className={styles.quantityDisplay}>{value}</span>

      <button
        type="button"
        onClick={handleIncrement}
        className={styles.stepperBtn}
        // Knappen deaktiveres nu på det levende lager tal
        disabled={Number(value) >= Number(stock)}
      >
        +
      </button>
    </div>
  );
}
