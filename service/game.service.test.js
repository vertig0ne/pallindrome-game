/* eslint-disable no-undef */
import model from '../model/score.js';
import service from './game.service.js';

describe('game service', () => {
  beforeAll(() => {
    // Ensure db is empty
    model.reset(true);
  });

  test('abba should be a score of 4', () => {
    const test = { name: 'test', word: 'abba' };
    expect(service.submit(test)).toBe(4);
  });

  test('asdkjd should throw error', () => {
    const test = { name: 'test', word: 'asdkjd' };
    expect(() => {
      service.submit(test);
    }).toThrowError(new Error('Word is not Pallindrome'));
  });

  test('tttttttttttttttttttt should be a score of 20', () => {
    const test = { name: 'test', word: 'tttttttttttttttttttt' };
    expect(service.submit(test)).toBe(20);
  });
});

describe('can generate a top 5', () => {
  beforeAll(() => {
    // Ensure db is empty
    model.reset(true);
  });

  test('can add and get several times', () => {
    service.submit({ name: 'test', word: 't' });
    service.submit({ name: 'test', word: 'tt' });
    service.submit({ name: 'test', word: 'ttt' });
    service.submit({ name: 'test', word: 'tttt' });
    service.submit({ name: 'test', word: 'ttttt' });
    service.submit({ name: 'test', word: 'tttttt' });
    service.submit({ name: 'test', word: 'ttttttt' });
    service.submit({ name: 'test', word: 'tttttttt' });
    service.submit({ name: 'test', word: 'ttttttttt' });
    service.submit({ name: 'test', word: 'tttttttttt' });

    expect(service.getScores().length).toBe(10);
  });

  test('can make top 5', () => {
    const scores = service.getTop5();

    expect(scores.length).toBe(5);
    expect(scores[0].points).toBe(10);
    expect(scores[1].points).toBe(9);
    expect(scores[2].points).toBe(8);
    expect(scores[3].points).toBe(7);
    expect(scores[4].points).toBe(6);
  });
});

test('can reset scoreboard', () => {
  service.resetScores();
  expect(service.getScores().length).toBe(0);
});