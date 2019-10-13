import Realm from "realm";
import {
  AlphabetData,
  FlagData,
  NumberData,
  AlphabetDescriptionData,
  LetterWords
} from "./data";

export const ALPHABET = "alphabet";
export const WORDS = "letters";
export const ALPHABETDESC = "alphabet_description";
export const ALPHABETDESCRIPTIONLIST = "alphabet_description_list";
export const USER = "user";
export const FLAG = "flag";
export const PATH = "path";
export const PATHLIST = "pathlist";
export const PATHDATA = "pathdata";
export const PATHDATATLIST = "pathdatalist";
export const FlagSchema = {
  name: FLAG,
  primaryKey: "id",
  properties: {
    id: { type: "int", default: 0 },
    flag: "string",
    country: "string",
    code: "string",
    continent: "string"
  }
};
export const NUMBER = "number";
export const NumberSchema = {
  name: NUMBER,
  primaryKey: "id",
  properties: {
    id: { type: "int", default: 0 },
    number: "string"
  }
};
export const AlphabetSchema = {
  name: ALPHABET,
  primaryKey: "id",
  properties: {
    id: { type: "int", default: 0 },
    capital_letter: "string",
    small_letter: "string",
    vc: { type: "string", default: "consonant" }
  }
};
export const AlphabetDescriptionListSchema = {
  name: ALPHABETDESCRIPTIONLIST,
  primaryKey: "id",
  properties: {
    id: "int",
    name: "string",
    image: "string"
  }
};
export const AlphabetDescriptionSchema = {
  name: ALPHABETDESC,
  primaryKey: "id",
  properties: {
    id: { type: "int", default: 0 },
    alphabet: "int",
    alphabet_desc: { type: "list", objectType: ALPHABETDESCRIPTIONLIST }
  }
};
export const LetterWordsSchema = {
  name: WORDS,
  primaryKey: "id",
  properties: {
    id: { type: "int", default: 0 },
    word: "string",
    type: "int" //1,2,3,4,5
  }
};
export const UsersSchema = {
  name: USER,
  primaryKey: "id",
  properties: {
    id: { type: "int", default: 0 },
    name: "string",
    age: "int",
    bg: "string",
    current: { type: "bool", default: false }
  }
};
export const PathDataSchema = {
  name: PATHDATA,
  primaryKey: "id",
  properties: {
    id: { type: "int", default: 0 },
    data: { type: "list", objectType: PATHDATATLIST }
  }
};
export const PathDataListSchema = {
  name: PATHDATATLIST,
  primaryKey: "id",
  properties: {
    path: { type: "int", default: 0 },
    id: "string",
    datum: "string"
  }
};
export const PathListSchema = {
  name: PATHLIST,
  primaryKey: "id",
  properties: {
    id: { type: "int", default: 0 },
    color: "string",
    width: { type: "int", default: 0 },
    sizeWidth: { type: "double", default: 0 },
    sizeHeight: { type: "double", default: 0 }
  }
};
export const PathSchema = {
  name: PATH,
  primaryKey: "id",
  properties: {
    id: { type: "int", default: 0 },
    paths: { type: "list", objectType: PATHLIST }
  }
};

const databaseOptions = {
  path: "tallyskiip.realm",
  schema: [
    AlphabetSchema,
    FlagSchema,
    AlphabetDescriptionListSchema,
    AlphabetDescriptionSchema,
    LetterWordsSchema,
    NumberSchema,
    UsersSchema,
    PathSchema,
    PathListSchema,
    PathDataSchema,
    PathDataListSchema,
  ],
  schemaVersion: 1
};

export const initializePaths = (id, paths) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let addPath = realm.create(PATH, {
            id: id,
            paths: []
          });
          addPath.paths.push({
            id: paths.path.id,
            color: paths.path.color,
            width: paths.path.width,
            sizeWidth: paths.size.width,
            sizeHeight: paths.size.height
          });
          let addPathData = realm.create(PATHDATA, {
            id: id,
            data: []
          });
          for (let i = 0; i < paths.path.data.length; i++) {
            addPathData.data.push({
              path: paths.path.id,
              id: `${Math.random() * 30000000} ${Date.now()}`,
              datum: paths.path.data[i]
            });
            if (i === paths.path.data.length - 1) {
              resolve();
            }
          }
        });
      })
      .catch(error => reject(error));
  });
export const addMorePaths = (id, paths) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let addPath = realm.objectForPrimaryKey(PATH, id);
          addPath.paths.push({
            id: paths.path.id,
            color: paths.path.color,
            width: paths.path.width,
            sizeWidth: paths.size.width,
            sizeHeight: paths.size.height
          });
          let addPathData = realm.objectForPrimaryKey(PATHDATA, id);
          for (let i = 0; i < paths.path.data.length; i++) {
            addPathData.data.push({
              path: paths.path.id,
              id: `${Math.random() * 30000000} ${Date.now()}`,
              datum: paths.path.data[i]
            });
            if (i === paths.path.data.length - 1) {
              resolve();
            }
          }
        });
      })
      .catch(error => reject(error));
  });
export const queryAllData = tb =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let allData = null;
        switch (tb) {
          case "alphabet":
            allData = realm.objects(ALPHABET);
            break;
          case "alphabet_desc":
            allData = realm.objects(ALPHABETDESC);
            break;
          case "paths":
            allData = realm.objects(PATH);
            break;
          case "data":
            allData = realm.objects(PATHDATA);
            break;
          case "letters":
            allData = realm.objects(WORDS);
            break;
          case "flag":
            allData = realm.objects(FLAG);
            break;
          case "number":
            allData = realm.objects(NUMBER);
            break;
          case "user":
            allData = realm.objects(USER);
            break;
          default:
            allData = realm.objects(ALPHABET);
        }
        resolve(allData);
      })
      .catch(error => reject(error));
  });
export const insertNewUser = newKid =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const allUserData = realm.objects(USER);
          allUserData.forEach(item => {
            let updatingCurrentUser = realm.objectForPrimaryKey(USER, item.id);
            updatingCurrentUser.current = false;
          });
          const id = allUserData.length + 1;
          const color = [
            "#d9b4fe",
            "#4b5cfc",
            "#187cc7",
            "#2256bd",
            "#3b36b3",
            "#e8527f",
            "#ecdcfa",
            "#ff8465",
            "#c54b9a",
            "#2350dd",
            "#37459c",
            "#54b4f0",
            "#771853",
            "#3d506d",
            "#100922",
            "#7271df",
            "#231f69",
            "#4e0939",
            "#b5043e",
            "#1c174b",
            "#262c3b",
            "orange",
            "black"
          ];
          const data = {
            id,
            name: newKid.name,
            age: newKid.age,
            current: true,
            bg: color[Math.floor(Math.random() * color.length)]
          };
          realm.create(USER, data);
          resolve(data);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
export const updateUser = kidsDetails =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let updatingNewUser = realm.objectForPrimaryKey(USER, kidsDetails.id);
          updatingNewUser.name = kidsDetails.name;
          updatingNewUser.age = kidsDetails.age;
          resolve();
        });
      })
      .catch(error => reject(error));
  });
export const updateCurrentUserToFalse = kidsDetails =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let updatingCurrentUser = realm.objectForPrimaryKey(
            USER,
            kidsDetails.id
          );
          updatingCurrentUser.current = false;
          resolve();
        });
      })
      .catch(error => reject(error));
  });
export const updateCurrentUserToTrue = kidsDetails =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const allUserData = realm.objects(USER);
          allUserData.forEach(item => {
            let updatingCurrentUser = realm.objectForPrimaryKey(USER, item.id);
            updatingCurrentUser.current = false;
          });
          let updatingCurrentUser = realm.objectForPrimaryKey(
            USER,
            kidsDetails.id
          );
          updatingCurrentUser.current = true;
          resolve();
        });
      })
      .catch(error => reject(error));
  });
export const deleteUser = kidId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let deletingUser = realm.objectForPrimaryKey(USER, kidId);
          realm.delete(deletingUser);
          resolve();
        });
      })
      .catch(error => reject(error));
  });
export const initializeAlphabetDescription = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          for (let i in AlphabetDescriptionData) {
            let aplha = realm.create(ALPHABETDESC, {
              id: AlphabetDescriptionData[i].id,
              alphabet: AlphabetDescriptionData[i].alphabet,
              alphabet_desc: []
            });
            aplha.alphabet_desc.push(
              AlphabetDescriptionData[i].alphabet_desc[0],
              AlphabetDescriptionData[i].alphabet_desc[1],
              AlphabetDescriptionData[i].alphabet_desc[2],
              AlphabetDescriptionData[i].alphabet_desc[3],
              AlphabetDescriptionData[i].alphabet_desc[4]
            );
            if (i >= AlphabetDescriptionData.length - 1) {
              resolve();
            }
          }
        });
      })
      .catch(error => reject(error));
  });
export const initializeAlphabet = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          for (let i in AlphabetData) {
            realm.create(ALPHABET, AlphabetData[i]);
            if (i >= AlphabetData.length - 1) {
              resolve();
            }
          }
        });
      })
      .catch(error => reject(error));
  });
export const initializeLetter = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          for (let i in LetterWords) {
            realm.create(WORDS, LetterWords[i]);
            if (i >= LetterWords.length - 1) {
              resolve();
            }
          }
        });
      })
      .catch(error => reject(error));
  });
export const initializeNumber = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          for (let i in NumberData) {
            realm.create(NUMBER, NumberData[i]);
            if (i >= NumberData.length - 1) {
              resolve();
            }
          }
        });
      })
      .catch(error => reject(error));
  });
export const initializeFlag = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          for (let i in FlagData) {
            realm.create(FLAG, FlagData[i]);
            if (i >= FlagData.length - 1) {
              resolve();
            }
          }
        });
      })
      .catch(error => reject(error));
  });
export default new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => resolve(realm));
});
