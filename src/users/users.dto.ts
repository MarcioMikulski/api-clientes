import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @Length(3, 50, {
    message: 'Nome deve conter entre 3 e 50 caracteres',
  })
  name: string;

  @IsNotEmpty({ message: 'O campo email não pode estar vazio' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'O campo senha não pode estar vazio' })
  password: string;
}
