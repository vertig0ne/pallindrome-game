import game from '../service/game.service.js';

export const getScores = (req, res) => {
  const scores = game.getTop5();
  res.json(scores);
};

export const submitEntry = (req, res) => {
  try { 
    const { name, word } = req.body;
    const points = game.submit({ name, word });
    res.send(points.toString());
  } catch (err) {
    const zero = 0;
    res.send(zero.toString());
  }
};

export default { getScores, submitEntry };
