import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {ImageBackground} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import LottieError from '../../components/LottieError';
import LottieLoading from '../../components/LottieLoading';
import NoResults from '../../components/NoResults';
import api from '../../data/api';
import AlphaFlatList from './AlphaFlatList';
import CharactersFlatList from './CharactersFlatList/CharactersFlatList';

export default function HomeScreen() {
  const [characterLetter, setCharacterLetter] = useState<string>('#');
  const [charactersResult, setCharactersResult] = useState([]);
  const [error, setError] = useState(false);
  const [lottieLoading, setLottieLoading] = useState(false);

  React.useEffect(() => {
    getCharacter();
  }, []);

  const getCharacter = useCallback(
    async (cLetter: string = characterLetter) => {
      setCharacterLetter(cLetter);

      let letter = cLetter;
      if (letter == '#') {
        letter = '3';
      }

      try {
        setLottieLoading(true);

        const res = await axios.get(
          `${api.CHARACTER_URL}nameStartsWith=${letter}${api.API}`,
        );
        const items = res.data.data.results;

        if (items === undefined || items.length == 0) {
          setLottieLoading(false);
          setCharactersResult([]);
          return;
        }

        const charactersData = items.map(item => {
          return {
            id: item.id,
            title: item.name,
            description: item.description,
            comics: item.comics.available,
            image:
              item.thumbnail.path +
              '/portrait_uncanny.' +
              item.thumbnail.extension,
            link: item.urls[0].url,
          };
        });

        setError(false);
        setCharacterLetter(cLetter);
        // dispatch(setReduxComic(comicData));
        setCharactersResult(charactersData);
        setLottieLoading(false);
      } catch (err) {
        setLottieLoading(false);
        setError(true);
        console.log(`ERROR: ${err}`);
      }
    },
    [characterLetter],
  );

  let content = <NoResults />;

  if (charactersResult.length > 0) {
    content = <CharactersFlatList charactersResult={charactersResult} />;
  }
  if (lottieLoading) {
    content = <LottieLoading />;
  }
  if (error) {
    content = <LottieError onPress={() => getCharacter()} />;
  }

  return (
    <ImageBackground
      source={require('../../assets/images/comicBG.4.jpg')}
      style={{flex: 1, paddingTop: 0}}>
      <CustomHeader title={characterLetter} />
      <AlphaFlatList active={characterLetter} getCharacter={getCharacter} />
      {content}
    </ImageBackground>
  );
}
