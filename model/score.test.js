/* eslint-disable no-undef */
import scores from './score.js';

describe('scores model', () => {
  beforeAll(() => {
    // Ensure db is empty
    scores.reset(true);
  });

  test('can add to db', () => {
    scores.add({ name: 'test', points: 50 });
    expect(scores.get().length).toBe(1);
  });

  test('can add/get several items from db', () => {
    // + the test we haven't cleared from above
    scores.add({ name: 'test', points: 1 });
    scores.add({ name: 'test', points: 10 });
    scores.add({ name: 'test', points: 5 });
    scores.add({ name: 'test', points: 20 });
    scores.add({ name: 'test', points: 15 });
    scores.add({ name: 'test', points: 17 });

    expect(scores.get().length).toBe(7);
  });

  test('can reset scores', () => {
    scores.reset(true);
    expect(scores.get().length).toBe(0);
  });
});