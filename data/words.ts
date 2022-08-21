import words from "./words.json";

export type Letters = Record<string, number>;

export interface Word {
  key: string;
  class: Class;
}

export type Class = "letter-correct" | "letter-elsewhere" | "letter-absent";

function getLetters(letters: string[]): Letters {
  const l: Letters = {};
  // prettier-ignore
  return (letters.forEach((lt) => (l[lt] = (l[lt] || 0) + 1)), l);
}

export function getRandomWord(): string {
  return words[Math.floor(Math.random() * words.length)];
}

export function existsWord(word: string): boolean {
  return words.includes(word.toLowerCase());
}

export function checkWord(word: string, letters: string[]): Word[] {
  const w = word.toUpperCase();
  const l = letters.join("").toUpperCase().split("");
  if (w === l.join("")) return l.map((lt) => ({ key: lt, class: "letter-correct" }));
  const lts = getLetters(w.split(""));
  const result: Word[] = [];
  l.forEach((letter, i) => {
    if (letter === w[i]) {
      result[i] = { key: letter, class: "letter-correct" };
      lts[letter]--;
    }
  });
  l.forEach((letter, i) => {
    if (letter === w[i]) return;
    if (lts[letter] && lts[letter] > 0) {
      result[i] = { key: letter, class: "letter-elsewhere" };
      lts[letter]--;
    } else if (!lts[letter]) {
      result[i] = { key: letter, class: "letter-absent" };
    }
  });
  return result;
}
