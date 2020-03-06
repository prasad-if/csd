
export const DBConfig = {
  name: 'SurveyDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'surveys',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: []
    },
    {
      store: 'user',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: []
    }
    ,
    {
      store: 'conf',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: []
    }
  ]
};

export const LocaleConfig = {
    languages: [{ id:'_en', text:'English'}, {id:'_tn', text:'Tamil'},{id:'_te', text:'Telugu'},{id:'_hn', text:'Hindi'},{id:'_kn', text:'Kannada'}]
}
