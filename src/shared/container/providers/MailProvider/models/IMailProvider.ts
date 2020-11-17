import ISendMailDTO from '../dtos/ISendMailDTO';
export default interface IMailProvider {
  //promise<void> - não retorna nada
  sendMail(data: ISendMailDTO): Promise<void>;
}
