import { container } from 'tsyringe';

import IHashProvider from './implementations/BCryptHashProvider';
import BCryptHashProvider from './implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
