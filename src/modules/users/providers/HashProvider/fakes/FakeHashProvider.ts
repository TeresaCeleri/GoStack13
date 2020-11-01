import IHashProvider from '../models/IHashProvider';

//está diferente por conta de um erro e então aceitei a sugestão
class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return  payload === hashed;
  }
}

export default FakeHashProvider;