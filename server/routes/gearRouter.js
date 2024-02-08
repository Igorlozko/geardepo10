import {Router} from 'express'

import {createGear, getGears} from '../controllers/gear.js'
import auth from '../middleware/auth.js';


const gearRouter = Router()
gearRouter.post('/',auth, createGear);
gearRouter.get('/', getGears);

export default gearRouter;