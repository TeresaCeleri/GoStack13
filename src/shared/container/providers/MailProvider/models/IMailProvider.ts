export default interface IMailProvider {
  //promise<void> - não retorna nada
  sendMail(to: string, body: string): Promise<void>;
}