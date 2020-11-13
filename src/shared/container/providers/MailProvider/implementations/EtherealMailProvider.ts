import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      console.log(account);
      this.client = transporter;
    });
  }

  private async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: "Equipe Gobarber",
      to,
      subject: "Recuperação de senha",
      text: body,
    });
    console.log('Message', message.message.id);
    console.log('Preview', nodemailer.getTestMessageUrl(message));
  }
}
