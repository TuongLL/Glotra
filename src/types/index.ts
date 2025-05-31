import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type ChildrenProps = {
  children: ReactNode;
};

export type IToken = {
  accessToken: string;
  refreshToken?: string;
};

export interface CurrentUserProps {
  currentUser?: {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    password: string | null;
    isAdmin: boolean;
  } | null;
}


export type ISelectLanguage = {
  code: string;
  name: string
}

export type IDictionary = {
  word: string
  phonetic: string
  phonetics: {
    text: string
    audio: string
  }[]
  meanings: {
    partOfSpeech: string
    definitions: {
      definition: string
      synonyms: string[]
      antonyms: string[]
    }[]
    synonyms: string[]
    antonyms: string[]
  }[]
  license: {
    name: string
    url: string
  }
  sourceUrls: string[]
}