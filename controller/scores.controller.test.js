/* eslint-disable no-undef */
import { mockRequest, mockResponse } from '../util/interceptor.js';
import controller from './scores.controller.js';
import service from '../service/game.service.js';

describe('Check method \'getScores\'', () => {
  beforeAll(() => {
    // Ensure there is at least 1 item in the scores 'db' before trialing
    service.submit({ name: 'test', word: 'abba' });
  });

  test('should 200 and return correct value', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await controller.getScores(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([{ name: 'test', points: 4 }]);
  });
});

describe('Check method \'submitEntry\'', () => {
  test('should return pallindrome score of 4', async () => {
    const req = mockRequest();
    req.body = { name: 'test', word: 'abba' };
    const res = mockResponse();

    await controller.submitEntry(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith('4');
  });

  test('should return pallindrome score of 30', async () => {
    const req = mockRequest();
    req.body = { name: 'test', word: 'tttttttttttttttttttttttttttttt' };
    const res = mockResponse();

    await controller.submitEntry(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith('30');
  });

  test('should return pallindrome score of 0', async () => {
    const req = mockRequest();
    req.body = { name: 'test', word: 'wejrewjrh' };
    const res = mockResponse();

    await controller.submitEntry(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith('0');
  });
});