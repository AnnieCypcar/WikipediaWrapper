import express from 'express';
import cors from 'cors';
import { Routes } from './routes.js';

const app = express();
app.use(express.json());
app.use(cors());

Routes(app);

export default app;