import { Prisma, User } from "../generated/prisma";
import { prisma } from "../lib/prima";
import { RegisterInput } from "../services/register.service";
import { UsersRepository } from "./users-repository";

export class PrismaUsersRepository implements UsersRepository {

   async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
        data
    })
    return user;
   }

   async findByEmail(email: string): Promise<User | null> {
       const user = await prisma.user.findUnique({
           where: {
               email
           }
       });
       return user;
   }
    
}