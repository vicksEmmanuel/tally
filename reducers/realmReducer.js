import {
  INITIALIZE,
  ALPHABET,
  FLAG,
  NUMBER,
  GRAY,
  ALPHABETDESC,
  LETTER,
  USERS,
  PATHS,
  CURRENT_USER,
  PATHSDATA
} from "../actions/actionTypes.js";
import React, { Component } from "react";
import { View } from "react-native";
const initState = {
  init: false,
  alphabet: [],
  flag: [],
  count: [],
  alphabetdescription: [],
  view: false,
  slimView: [<View />],
  letter: [],
  user: [],
  paths: [],
  data: [],
  current: null,
};
const realmReducer = (state = initState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        init: action.init
      };
    case CURRENT_USER:
      return {
        ...state,
        current: action.current
      }
    case ALPHABET:
      return {
        ...state,
        alphabet: action.alphabet
      };
    case USERS:
      return {
        ...state,
        user: action.user,
      };
    case PATHS:
      return {
        ...state,
        paths: action.paths,
      };
      case PATHSDATA:
        return {
          ...state,
          data: action.data,
        };
    case FLAG:
      return {
        ...state,
        flag: action.flag
      };
    case NUMBER:
      return {
        ...state,
        count: action.count
      };
    case GRAY:
      return {
        ...state,
        view: action.view,
        slimView: action.slimView
      };
    case ALPHABETDESC:
      return {
        ...state,
        alphabetdescription: action.alphabetdescription
      };
    case LETTER:
      return {
        ...state,
        letter: action.letter
      };
    default:
      return state;
  }
};

export default realmReducer;
