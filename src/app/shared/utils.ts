import * as levenshtein from 'js-levenshtein';

export function isAnswerCorrect(original: string, answer: string): boolean {
  return levenshtein(original.toLowerCase(), answer.toLowerCase()) /
    original.length <
    0.3
    ? true
    : false;
}
