// While for the most part we will use use the data in memory
// We do however, still want to persist a tiny detail to a file
// Which will be read on startup and wrote on shutdown
import fs from 'fs';

let scores = (process.env.PERSIST_DATA) ? JSON.parse(fs.readFileSync('./model/score.json')) || [] : [];

const write = () => {
  if (process.env.PERSIST_DATA) fs.writeFileSync('./model/score.json', JSON.stringify(scores, null, 2));
};

process.on('beforeExit', () => {
  if (process.env.PERSIST_DATA) write();
});

export const get = () => {
  return scores;
};

export const add = ({ name, points }) => {
  scores.push({ name, points });
  write();
};

export const reset = (verify = false) => {
  if (verify) scores = [];
};

export default { get, add, reset, scores };
