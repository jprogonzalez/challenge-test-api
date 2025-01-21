import { query } from "../../../database/mysql";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/userRepository";

export class MysqlRepository implements UserRepository {
    
    async createUser(userData: User): Promise<User | null> {
        let sql = "INSERT INTO users(name,last_name,email,password) values(?,?,?,?)";
        const params:any[] = [userData.name,userData.last_name,userData.email,userData.password];
        const [result]:any = await query(sql,params);

        userData.id = result.insertId;
        return userData;
    }

    async listUsers(queryString:string): Promise<User[] | any[]> {

        let sql = "SELECT id, name, last_name, email, role FROM users WHERE email LIKE ? OR name LIKE ? OR last_name LIKE ? OR role LIKE ?";
        
        const params = [`%${queryString}%`, `%${queryString}%`, `%${queryString}%`, `%${queryString}%`];
        
        const [data]:any = await query(sql,params);
        
        const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));
        
        return dataUsers.map(
            (user:any) => 
                new User(
                    user.id,
                    user.name,
                    user.last_name,
                    user.email,
                    "",
                    user.role
                )
        );
    }

    async getUser(userId: string): Promise<any> {
        
        let sql = "SELECT id,name,last_name,email,role FROM users where id = ? and deleted_at is null";
        
        const params:any[] = [userId];

        const result:any | null = await query(sql,params);

        const [userData] = result[0] || [];
        
        return userData || null;
    }

    async getUserByParamsValue(param: string | number, value: string | any): Promise<User | null> {

        let sql = `SELECT id,name,last_name,email,role FROM users where ${param} = ? and deleted_at is null`;
        
        const params:any[] = [value];

        const result:any | null = await query(sql,params);

        const [userData] = result[0] || [];
        
        return userData || null;
    }

    async updateUser(userData: User): Promise<any|null> {
  
        let sql = "UPDATE users SET email = ?, name = ?, last_name = ? where id =  ?";
        
        const params:any[] = [userData.email,userData.name,userData.last_name,userData.id];
        
        await query(sql,params);

        return userData;
    }

    async removeUser(userId:string): Promise<any> {
        let sql = "UPDATE users SET deleted_at = NOW() WHERE id = ?";
        const params:any[] = [userId];
        const result:any | null = await query(sql,params);

        return result;
    }
}