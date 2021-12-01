import md5 from 'md5';
import {PRIVATE_API, PUBLIC_API} from 'react-native-dotenv';

const ts = Date.now();
const hash = md5(ts + PRIVATE_API + PUBLIC_API);

export default {
  URL: 'https://gateway.marvel.com/v1/public/',
  CHARACTER_URL: 'https://gateway.marvel.com:443/v1/public/characters?',
  COMIC_URL: 'https://gateway.marvel.com:443/v1/public/characters/',
  API: `&ts=${ts}&apikey=${PUBLIC_API}&hash=${hash}`,
};
