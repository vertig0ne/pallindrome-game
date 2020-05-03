import express from 'express';
import * as controller from '../controller/scores.controller.js';

export const name = 'submitEntry';
export const router = express.Router();

router.post('/', controller.submitEntry);

export default { name, router };
