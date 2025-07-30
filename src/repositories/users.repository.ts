import { prisma } from "../lib/prima";
import { RegisterInput } from "../services/register.service";

export class PrismaUsersRepository {
    async createUser({
        name, email, password
    }: RegisterInput) {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });

        return user;
    }
}