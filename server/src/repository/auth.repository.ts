import User from '../models/user';

export class AuthRepository {
    static async getUserByEmail(email: string): Promise<User | null> {
        return User.findOne({
            where: {
                email,
            },
        })
    }

    static async getUserById(id: number): Promise<User | null> {
        return User.findOne({
            where: {
                id,
            },
        });
    }

    static async createUser(email: string, password: string): Promise<User> {
        return User.create({
            email,
            password,
        });
    }

    static async verifyUser(id: number): Promise<User> {
        await User.update(
            { is_verified: true },
            {
                where: {
                    id,
                },
            }
        );
        return User.findByPk(id);
    }
}