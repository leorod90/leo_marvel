import {SET_CHARACTER_LETTER, SET_REDUX_COMIC} from './actions';

const initialState = {
  characterLetter: [],
  reduxComics: [],
};

interface Actions {
  type: string;
  characterLetter: string;
  reduxComics: any;
}

export default (
  state = initialState,
  {type, characterLetter, reduxComics}: Actions,
) => {
  switch (type) {
    case SET_CHARACTER_LETTER:
      return {...state, characterLetter};

    case SET_REDUX_COMIC:
      return {...state, reduxComics};

    default:
      return state;
  }
};
