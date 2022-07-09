import { getRandomWord } from "api/api";
import { GetServerSideProps } from "next";

import Game from "components/Game/Game";
import Header from "components/Header/Header";

interface AppProps {
  word: string;
}

export default function App({ word }: AppProps) {
  return (
    <>
      <Header />
      <Game initialWord={word} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await getRandomWord();
  return {
    props: {
      word: res.word ?? null,
    },
  };
};
