import { CreateUserUseCase } from "../application/createUserUseCase";
import { GetUserUseCase } from "../application/getUserUseCase";
import { ListUsersUseCase } from "../application/listUserUseCase";
import { RemoveUsersUseCase } from "../application/removeUserUseCase";
import { UpdateUserUseCase } from "../application/updateUserUseCase";
import { CreateUserController } from "./controllers/createUserController";
import { GetGhibliApiResourcesByRoleController } from "./controllers/getGhibliApiResourcesByRole";
import { GetUserController } from "./controllers/getUserController";
import { ListUserController } from "./controllers/listUserController";
import { RemoveUserController } from "./controllers/removeUserController";
import { UpdateUserController } from "./controllers/updateUserController";
import { MysqlRepository } from "./repositories/mysqlRepository";


const userMysqlRepository = new MysqlRepository();

const createUserUseCase = new CreateUserUseCase(userMysqlRepository);
export const createUserController = new CreateUserController(createUserUseCase);

const listUserUseCase = new ListUsersUseCase(userMysqlRepository);
export const listUsersController = new ListUserController(listUserUseCase);

const getUserUseCase = new GetUserUseCase(userMysqlRepository);
export const getUserController = new GetUserController(getUserUseCase);

const updateUserUseCase = new UpdateUserUseCase(userMysqlRepository);
export const updateUserController = new UpdateUserController(updateUserUseCase);

const removeUserUseCase = new RemoveUsersUseCase(userMysqlRepository);
export const removeUserController = new RemoveUserController(removeUserUseCase);

export const getGhibliApiResourcesByRoleController = new GetGhibliApiResourcesByRoleController(getUserUseCase);
