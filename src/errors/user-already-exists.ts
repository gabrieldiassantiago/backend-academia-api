export class UserAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`Usuário com o email ${email} já existe.`);
    this.name = 'UserAlreadyExistsError';
  }
}