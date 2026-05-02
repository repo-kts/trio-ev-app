import { Router } from 'express';
import { overviewHandler } from './dashboard.controller';

export const dashboardAdminRouter: Router = Router();
dashboardAdminRouter.get('/overview', overviewHandler);
