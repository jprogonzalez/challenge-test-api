import bcrypt from 'bcrypt';

const saltRounds = 10;

export class BcryptService {
    static async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
}
