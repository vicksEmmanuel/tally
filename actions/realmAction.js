import {
  initializeAlphabet,
  queryAllData,
  initializeFlag,
  initializeNumber,
  initializeAlphabetDescription,
  initializeLetter,
  insertNewUser,
  initializePaths,
  updateCurrentUserToTrue,
  updateUser,
  deleteUser,
  addMorePaths,
} from "../realm/allSchema";
import {
  INITIALIZE,
  ALPHABET,
  FLAG,
  NUMBER,
  GRAY,
  USERS,
  ALPHABETDESC,
  LETTER,
  CURRENT_USER,
  ADDUSER,
  EDITCURRENTUSER,
  EDITUSER,
  DELETEUSER,
  PATHS,
  PATHSDATA,
} from "./actionTypes";

export const getPaths = () => {
  return dispatch => {
    queryAllData("paths")
      .then(data => {
        dispatch({
          type: PATHS,
          paths: data
        });
      })
      .catch(error => {
        dispatch({
          type: PATHS,
          paths: []
        });
      });
  };
};
export const getPathData = () => {
  return dispatch => {
    queryAllData("data")
      .then(data => {
        dispatch({
          type: PATHSDATA,
          data: data
        });
      })
      .catch(error => {
        dispatch({
          type: PATHSDATA,
          data: []
        });
      });
  };
};
export const addPaths = (id, paths) => {
  return dispatch => {
    initializePaths(id, paths)
      .then(path => {
        dispatch({
          type: INITIALIZE,
          init: true
        });
      })
      .catch(error => {
        dispatch({
          type: INITIALIZE,
          init: false
        });
      });
  };
};
export const updatePaths = (id, paths) => {
  return dispatch => {
    addMorePaths(id, paths)
      .then(path => {
        dispatch({
          type: INITIALIZE,
          init: true
        });
      })
      .catch(error => {
        alert(error);
        dispatch({
          type: INITIALIZE,
          init: false
        });
      });
  };
};
export const addUser = newUser => {
  return dispatch => {
    insertNewUser(newUser)
      .then(user => {
        dispatch({
          type: INITIALIZE,
          init: true
        });
      })
      .catch(error => {
        dispatch({
          type: INITIALIZE,
          init: false
        });
      });
  };
};
export const setToCurrentUser = user => {
  return dispatch => {
    updateCurrentUserToTrue(user)
      .then(() => {
        queryAllData("user")
          .then(data => {
            const x = data.filter(item => {
              return item.current === true;
            });
            dispatch({
              type: CURRENT_USER,
              current: x[0]
            });
          })
          .catch(error => {
            dispatch({
              type: CURRENT_USER,
              current: null
            });
          });
      })
      .catch(error => {
        queryAllData("user")
          .then(data => {
            const x = data.filter(item => {
              return item.current === true;
            });
            dispatch({
              type: CURRENT_USER,
              current: x[0]
            });
          })
          .catch(error => {
            dispatch({
              type: CURRENT_USER,
              current: null
            });
          });
      });
  };
};
export const getUsers = () => {
  return dispatch => {
    queryAllData("user")
      .then(data => {
        dispatch({
          type: USERS,
          user: data
        });
      })
      .catch(error => {
        dispatch({
          type: USERS,
          user: []
        });
      });
  };
};
export const getCurrentUser = () => {
  return dispatch => {
    queryAllData("user")
      .then(data => {
        const x = data.filter(item => {
          return item.current === true;
        });
        dispatch({
          type: CURRENT_USER,
          current: x[0]
        });
      })
      .catch(error => {
        dispatch({
          type: CURRENT_USER,
          current: null
        });
      });
  };
};
export const deleteAUser = id => {
  return dispatch => {
    deleteUser(id)
      .then(() => {
        queryAllData("user")
          .then(data => {
            const x = data.filter(item => {
              return item.current === true;
            });
            if (x.length > 0) {
              dispatch({
                type: CURRENT_USER,
                current: x[0]
              });
            } else {
              dispatch({
                type: CURRENT_USER,
                current: null
              });
            }
          })
          .catch(error => {
            dispatch({
              type: CURRENT_USER,
              current: null
            });
          });
      })
      .catch(error => {
        queryAllData("user")
          .then(data => {
            const x = data.filter(item => {
              return item.current === true;
            });
            if (x.length > 0) {
              dispatch({
                type: CURRENT_USER,
                current: x[0]
              });
            } else {
              dispatch({
                type: CURRENT_USER,
                current: null
              });
            }
          })
          .catch(error => {
            dispatch({
              type: CURRENT_USER,
              current: null
            });
          });
      });
  };
};
export const updateAUser = newUser => {
  return dispatch => {
    updateUser(newUser)
      .then(user => {
        dispatch({
          type: INITIALIZE,
          init: true
        });
      })
      .catch(error => {
        dispatch({
          type: INITIALIZE,
          init: false
        });
      });
  };
};
export const initLetter = () => {
  return dispatch => {
    initializeLetter()
      .then(() => {
        dispatch({
          type: INITIALIZE,
          init: true
        });
      })
      .catch(error => {
        dispatch({
          type: INITIALIZE,
          init: false
        });
      });
  };
};
export const getLetter = () => {
  return dispatch => {
    queryAllData("letters")
      .then(data => {
        dispatch({
          type: LETTER,
          letter: data
        });
      })
      .catch(error => {
        dispatch({
          type: LETTER,
          letter: []
        });
      });
  };
};
export const initAlphabet = () => {
  return dispatch => {
    initializeAlphabet()
      .then(() => {
        dispatch({
          type: INITIALIZE,
          init: true
        });
      })
      .catch(error => {
        dispatch({
          type: INITIALIZE,
          init: false
        });
      });
  };
};

export const getAlphabet = () => {
  return dispatch => {
    queryAllData("alphabet")
      .then(data => {
        dispatch({
          type: ALPHABET,
          alphabet: data
        });
      })
      .catch(error => {
        dispatch({
          type: ALPHABET,
          alphabet: []
        });
      });
  };
};

export const initFlag = () => {
  return dispatch => {
    initializeFlag()
      .then(data => {
        dispatch({
          type: INITIALIZE,
          init: true
        });
      })
      .catch(error => {
        dispatch({
          type: INITIALIZE,
          init: false
        });
      });
  };
};

export const getFlag = () => {
  return dispatch => {
    queryAllData("flag")
      .then(data => {
        dispatch({
          type: FLAG,
          flag: data
        });
      })
      .catch(error => {
        dispatch({
          type: FLAG,
          flag: []
        });
      });
  };
};

export const initNumber = () => {
  return dispatch => {
    initializeNumber()
      .then(() => {
        dispatch({
          type: INITIALIZE,
          init: true
        });
      })
      .catch(error => {
        dispatch({
          type: INITIALIZE,
          init: false
        });
      });
  };
};

export const getNumber = () => {
  return dispatch => {
    queryAllData("number")
      .then(data => {
        dispatch({
          type: NUMBER,
          count: data
        });
      })
      .catch(error => {
        dispatch({
          type: NUMBER,
          count: []
        });
      });
  };
};

export const initAlphabetDescription = () => {
  return dispatch => {
    initializeAlphabetDescription()
      .then(() => {
        dispatch({
          type: INITIALIZE,
          init: true
        });
      })
      .catch(error => {
        dispatch({
          type: INITIALIZE,
          init: false
        });
      });
  };
};

export const getAlphabetDescription = () => {
  return dispatch => {
    queryAllData("alphabet_desc")
      .then(data => {
        dispatch({
          type: ALPHABETDESC,
          alphabetdescription: data
        });
      })
      .catch(error => {
        dispatch({
          type: ALPHABETDESC,
          alphabetdescription: []
        });
      });
  };
};

export const grayUp = (x, y) => {
  return dispatch => {
    dispatch({
      type: GRAY,
      view: x,
      slimView: y
    });
  };
};
