export const SET_CHARACTER_LETTER = 'SET_CHARACTER_LETTER';
export const SET_REDUX_COMIC = 'SET_REDUX_COMIC';

export const setReduxCharacter = (characterLetter: string) => ({
  type: SET_CHARACTER_LETTER,
  characterLetter,
});

export const setReduxComic = (reduxComics: any) => ({
  type: SET_REDUX_COMIC,
  reduxComics,
});
