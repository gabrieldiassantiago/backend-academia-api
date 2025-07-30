import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from '../errors/user-already-exists';
import { UsersRepository } from '../repositories/users-repository';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}


export class RegisterService {

    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterInput) {

        const existingUser = await this.usersRepository.findByEmail(email);

        if (existingUser) {
            throw new UserAlreadyExistsError(email);
        }

        const hashedPassword = await hash(password, 6);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return {
            user
        }
    }

}
