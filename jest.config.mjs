export default {
  // Du kan skifte til "jsdom" senere, hvis du vil teste React-komponenter
  testEnvironment: 'node',

  // Hvor Jest skal lede efter tests
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],

  // Almindelige filtyper i dit projekt
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  // Rydder mocks mellem tests (god standard)
  clearMocks: true,

  // VIGTIGT: sørger for at Jest ikke fejler, selvom du ikke har tests endnu
  passWithNoTests: true,
};
