export default interface IHashProvider {
  //uma promise porque pode demorar um pouco
  generalHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed:string): Promise<boolean>;

}