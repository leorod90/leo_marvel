import React, {useState, useRef, useCallback} from 'react';
import {Dimensions, StyleSheet, Text, ImageBackground} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../data/api';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import axios from 'axios';
import ComicFlatList from './ComicFlatList/ComicFlatList';
import NoResults from '../../components/NoResults';
import Styles from '../../constants/Styles';
import {useSelector, useDispatch} from 'react-redux';
import {setReduxComic} from '../../redux/actions';
import {rootState} from '../../redux';
import Colors from '../../constants/Colors';
import LottieLoading from '../../components/LottieLoading';
import LottieError from '../../components/LottieError';
import FirstRender from './FirstRender';

export default function ComicsScreen() {
  const {reduxComics} = useSelector((state: rootState) => state.reducers);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lottieLoading, setLottieLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [comics, setComics] = useState<any>(reduxComics);
  const [itemId, setItemId] = useState(null);
  const [title, setTitle] = useState(null);
  const [query, setQuery] = useState<string | null>(null);
  const [firstRender, setFirstRender] = useState(true);

  const dropdownController = useRef(null);
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  const getSuggestions = useCallback(async (q = query) => {
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setQuery(q);
    dropdownController.current.open();
    try {
      setLoading(true);
      const res = await axios.get(
        `${api.URL}characters?nameStartsWith=${q}${api.API}`,
      );
      const items = res.data.data.results;
      const suggestions = items.map(item => {
        const url = item.thumbnail.path.replace(/^http:\/\//i, 'https://');
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          image: url + '.' + item.thumbnail.extension,
        };
      });
      setError(null);
      setSuggestionsList(suggestions);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('suggest');
      console.log(`ERROR: ${err}`);
    }
  }, []);

  const getComic = useCallback(async (id = itemId, name = title) => {
    setItemId(id);
    setTitle(name);
    if (firstRender) {
      setFirstRender(false);
    }

    try {
      setLottieLoading(true);
      const res = await axios.get(`${api.COMIC_URL}${id}/comics?${api.API}`);
      const items = res.data.data.results;

      if (items === undefined || items.length == 0) {
        setTitle(null);
        setLottieLoading(false);
        setComics([]);
        return;
      }

      const comicData = items.map(item => {
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          releaseDate: item.dates[0].date,
          image:
            item.thumbnail.path +
            '/portrait_uncanny.' +
            item.thumbnail.extension,
          link: item.urls[0].url,
        };
      });
      setError(null);
      setTitle(name);
      dispatch(setReduxComic(comicData));
      setComics(comicData);
      setLottieLoading(false);
    } catch (err) {
      setLoading(false);
      setError('comic');
      console.log(`ERROR: ${err}`);
    }
  }, []);

  let content = <NoResults />;

  if (firstRender) {
    content = <FirstRender />;
  }
  if (comics.length > 0) {
    content = <ComicFlatList comics={comics} />;
  }
  if (lottieLoading) {
    content = <LottieLoading />;
  }
  if (error) {
    if (error == 'suggest') {
      content = <LottieError onPress={() => getSuggestions()} />;
    }
    if (error == 'comic') {
      content = <LottieError onPress={() => getComic()} />;
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/images/comicBG.2.jpg')}
      style={{flex: 1, paddingTop: Styles.headerHeight}}>
      <CustomHeader title={title} />
      <AutocompleteDropdown
        ref={searchRef}
        controller={controller => {
          dropdownController.current = controller;
        }}
        dataSet={suggestionsList}
        onChangeText={getSuggestions}
        onSelectItem={item => {
          item && getComic(item.id, item.name);
        }}
        debounce={600}
        suggestionsListMaxHeight={Dimensions.get('window').height * 0.6}
        // onClear={onClearPress}
        // onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
        // onOpenSuggestionsList={onOpenSuggestionsList}
        loading={loading}
        // closeOnBlur={true}
        // closeOnSubmit={true}
        useFilter={false} // prevent re-render twice
        rightButtonsContainerStyle={styles.rightBtnContainer}
        inputContainerStyle={{
          backgroundColor: 'transparent',
        }}
        containerStyle={styles.autoContainer}
        textInputProps={{
          placeholder: 'Hero Name (3+ letters)',
          placeholderTextColor: Colors.gray,
          autoCorrect: false,
          autoCapitalize: 'none',
          style: styles.textInput,
        }}
        suggestionsListContainerStyle={styles.suggestContainer}
        renderItem={(item, text) => (
          <Text style={{color: Colors.black, padding: 15}}>{item.name}</Text>
        )}
        inputHeight={50}
        showChevron={loading ? false : true}
        ChevronIconComponent={
          <Icon name="chevron-down" size={26} color={Colors.black} />
        }
        showClear={false}
        // showClear={loading ? false : suggestionsList ? true : false}
        // ClearIconComponent={<Icon name="cancel" size={24} color="red" />}
      />
      {content}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  autoContainer: {
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Styles.bigPadding,
    zIndex: 999999,
    color: 'red',
  },
  textInput: {
    width: Styles.WIDTH - Styles.bigPadding * 2,
    borderRadius: 25,
    backgroundColor: Colors.txtInput,
    color: Colors.black,
    paddingLeft: 18,
  },
  suggestContainer: {
    backgroundColor: 'white',
  },
  rightBtnContainer: {
    borderRadius: 25,
    right: 8,
    top: 10,
    height: 32,
    width: 32,
    backgroundColor: Colors.txtInput,
    paddingLeft: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
