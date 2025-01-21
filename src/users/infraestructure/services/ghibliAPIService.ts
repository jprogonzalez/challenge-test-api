import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.GHIBLIAPI_URL_BASE;

export class GhibliApiService {
    static async getResource(resource: string | any): Promise<any> {
        try {
            const response = await axios.get(`${BASE_URL}/${resource}`);
            return response.data;
        } catch (error:any) {
            throw new Error(`Failed to fetch data from Studio Ghibli API: ${error.message}`);
        }
    }
}
