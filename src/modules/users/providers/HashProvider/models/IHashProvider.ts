//uma promise porque pode demorar um pouco
export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed:string): Promise<boolean>;
}
