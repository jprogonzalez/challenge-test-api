import express,{ Router } from "express";

import { 
    createUserController,
    getUserController,
    listUsersController,
    removeUserController,
    updateUserController,
    getGhibliApiResourcesByRoleController
} from "../dependencies";

export const userRoute:Router = express.Router();

userRoute.post('/',createUserController.execute.bind(createUserController));
userRoute.get('/',listUsersController.execute.bind(listUsersController));
userRoute.get("/:id/ghibli-api/:resource", getGhibliApiResourcesByRoleController.execute.bind(getGhibliApiResourcesByRoleController));
userRoute.get('/:id',getUserController.execute.bind(getUserController));
userRoute.put('/:id',updateUserController.execute.bind(updateUserController));
userRoute.delete('/:id',removeUserController.execute.bind(removeUserController));
