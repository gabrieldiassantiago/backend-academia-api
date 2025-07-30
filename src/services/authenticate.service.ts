import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error";
import { UsersRepository } from "../repositories/users-repository";

interface AuthenticateServiceRequest {
    email: string;
    password: string;
}

type AuthenticateServiceResponse = void

export class AuthenticateService {
    constructor(
        private usersRepository: UsersRepository,
    ) {}

    async execute({
        email, password
    }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatch = await compare(password, user.password);

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError();
        }
    }


}