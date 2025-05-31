import { getEnvSafely } from './config'

const TRANSLATE_API_URL = getEnvSafely('TRANSLATE_API_URL')
const TRANSLATE_API_KEY = getEnvSafely('TRANSLATE_API_KEY')
const OPENAI_API_URL = getEnvSafely('OPENAI_API_URL')
const OPENAI_API_KEY = getEnvSafely('OPENAI_API_KEY')
const OPENAI_API_MODEL = getEnvSafely('OPENAI_API_MODEL')
const DICTIONARY_API_URL = getEnvSafely('DICTIONARY_API_URL')
const env = {
  OPENAI_API_URL,
  OPENAI_API_KEY,
  OPENAI_API_MODEL,
  DICTIONARY_API_URL,
  TRANSLATE_API_URL,
  TRANSLATE_API_KEY,
};

export default env;
