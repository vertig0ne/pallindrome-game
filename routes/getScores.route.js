import express from 'express';
import * as controller from '../controller/scores.controller.js';

export const name = 'getScores';
export const router = express.Router();

router.get('/', controller.getScores);

export default { name, router };
