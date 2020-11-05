//import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('Should be able to recover the password using the email', async () => {
    //passamos repositorio fake
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    //verificar se o metodo sendMail foi executado
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    //criamos nosso server
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456',
    });


    //criamos um novo appointment passando
    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@exemplo.com',
    });

    //verificar se está retornando o esperado
    expect(sendMail).toHaveBeenCalled();
  });
});
