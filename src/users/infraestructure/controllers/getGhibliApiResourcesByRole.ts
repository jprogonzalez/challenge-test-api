import { Request, Response } from "express";
import { GetUserUseCase } from "../../application/getUserUseCase";
import { User } from "../../domain/entities/user";
import { RoleValidation } from "../../domain/validations/roleValidation";
import { GhibliApiService } from "../services/ghibliAPIService";

export class GetGhibliApiResourcesByRoleController {

    constructor(
        readonly useCase:GetUserUseCase
    ){}

    async execute(request:Request,response:Response) {
        try {

            const {id,resource} = request.params;

            let user:User = await this.useCase.execute(id);

            const hasPermissionsForRequestResources = RoleValidation.isValidRoleForResource(user.role,resource);

            if (!hasPermissionsForRequestResources) {
                return response.status(403).json({
                    message: `You do not have permission to access this resource: ${resource}`,
                });
            }

            const data = await GhibliApiService.getResource(resource);

            response.status(200).json({
                'data':data
            });
            

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    message:"Oops, Error to get resources the user's role from ghibli-api, please try again later",
                    error:error
                });
        }
    }

}