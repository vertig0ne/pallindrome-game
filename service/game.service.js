import scores from '../model/score.js';

const isPallindrome = (str) => {
  return str == str.split('').reverse().join('');
};

export const submit = ({ name, word }) => {
  if (!isPallindrome(word)) throw new Error('Word is not Pallindrome');

  const points = word.length;
  scores.add({ name, points });
  return points;
};

export const getScores = () => {
  return scores.get();
};

export const getTop5 = () => {
  // Sort scores by ascending order, take first 5
  return scores.get().sort((a, b) => { a.points - b.points; }).reverse().slice(0, 5);
};

export const resetScores = () => {
  scores.reset(true);
};

export default { isPallindrome, submit, getScores, getTop5, resetScores };
