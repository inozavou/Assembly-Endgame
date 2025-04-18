import { useEffect, useRef, useState } from "react";
import { languages } from "./languages";
import clsx from "clsx";

import { getFarewellText, randomWord } from "./utils";

function AssemblyEndgame() {
  //State values
  const [currentWord, setCurrentWord] = useState(() => randomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived value
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameLost || isGameWon;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  //static value
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function handleGuessedLetters(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  function resetGame() {
    setCurrentWord(randomWord());
    setGuessedLetters([]);
  }

  const languageElements = languages.map((lang, index) => {
    const isLost = index < wrongGuessCount && wrongGuessCount <= 8;

    const className = clsx("chip", isLost && "lost");
    return (
      <span
        className={className}
        key={lang.name}
        style={{
          backgroundColor: lang.backgroundColor,
          color: lang.color,
        }}
      >
        {lang.name}
      </span>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    );
    return (
      <span className={letterClassName} key={index}>
        {shouldRevealLetter ? letter.toLocaleUpperCase() : ""}
      </span>
    );
  });

  const keyboardElements = alphabet.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        key={index}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => handleGuessedLetters(letter)}
      >
        {letter.toLocaleUpperCase()}
      </button>
    );
  });

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
    return null;
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      <section aria-live="polite" role="status" className={gameStatusClass}>
        {renderGameStatus()}
      </section>

      <section className="language-chips">{languageElements}</section>

      <section className="word">{letterElements}</section>

      <section className="keyboard">{keyboardElements}</section>

      {isGameOver && (
        <button className="new-game" onClick={resetGame}>
          New Game
        </button>
      )}
    </main>
  );
}

export default AssemblyEndgame;
