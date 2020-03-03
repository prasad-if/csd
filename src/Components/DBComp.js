
export const DBConfig = {
  name: 'SurveyDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'surveys',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: []
    }
  ]
};
