import { Request, Response, Router} from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as userValidation from '../middleware/userValidation'
import { IUserController } from '../controllers/IUserController';

export class UserRouter {
    public router: Router;
    
    constructor(private userController: IUserController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        //Routes
        /**
         * @swagger
         * /users/createNewUser:
         *   post:
         *     summary: Create a new user
         *     tags: [Users]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/User'
         *     responses:
         *       200:
         *         description: New user created successfully
         *       400:
         *         description: New user creation failed
         */
        this.router.post('/createNewUser', userValidation.validateUserDetails, asyncHandler(this.userController.createUser));
        
        /**
         * @swagger
         * /users/login:
         *   post:
         *     summary: Check user password
         *     tags: [Users]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/User'
         *     responses:
         *       200:
         *         description: Password is valid
         *       401:
         *         description: Invalid password
         */
        this.router.post('/login', userValidation.validateUserDetails, asyncHandler(this.userController.checkUserPassword));
        
        /**
         * @swagger
         * /users:
         *   get:
         *     summary: Retrieve all user data
         *     tags: [Users]
         *     responses:
         *       200:
         *         description: A list of user data
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/User'
         */
        this.router.get('/', asyncHandler(this.userController.getUserData));
        
        /**
         * @swagger
         * /users/reset:
         *   get:
         *     summary: Reset all user data
         *     tags: [Users]
         *     responses:
         *       200:
         *         description: User data reset successfully
         *       400:
         *         description: User data reset failed
         */
        this.router.get('/reset', asyncHandler(this.userController.resetUserData));
    }
}