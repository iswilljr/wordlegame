import { decodeWord } from "utils/check-word";
import { resetGame } from "utils/reset-game";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { restartGame, stateSelector } from "store/appSlice";
import { Modal } from "./Modal";
import { getCookie } from "cookies-next";
import { getNumberOfLetters, NUMBER_OF_LETTERS_KEY } from "utils/numbers-of-letters";
import { useRouter } from "next/router";
import { useTranslation } from "hooks/use-translations";

export function GameState() {
  const router = useRouter();
  const translation = useTranslation();
  const dispatch = useAppDispatch();
  const { gameIs, word, isChallengeMode } = useAppSelector(stateSelector);
  const wordToGuess = decodeWord(word);

  return (
    <Modal
      active={gameIs !== "playing"}
      title={gameIs === "won" ? translation.tip_you_win : translation.tip_you_lost}
      titleClass={gameIs}
    >
      <div className="cont">
        <div className="desc">{translation.the_answer_was}</div>
        <div className="word">
          <span>{gameIs !== "playing" && wordToGuess}</span>
        </div>
        {gameIs !== "playing" && (
          <a
            className="definition"
            target="_blank"
            rel="noreferrer"
            href={`https://wordlegame.org/dictionary?q=${wordToGuess}+definition`}
          >
            {translation.what_does_it_mean}
          </a>
        )}
        <div className="restart_btn">
          <button
            type="button"
            onClick={() => {
              if (isChallengeMode) void router.replace("/");

              const numberOfLettersCookie = getCookie(NUMBER_OF_LETTERS_KEY);
              const numberOfLetters = getNumberOfLetters(numberOfLettersCookie);

              dispatch(restartGame(numberOfLetters));
              resetGame();
            }}
          >
            {isChallengeMode ? translation.new_game : translation.restart}
          </button>
        </div>
      </div>
    </Modal>
  );
}
