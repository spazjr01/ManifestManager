// Manifest Manager classes and components
import { IAuth } from '../interfaces/auth.interface';
import { Auth } from '../auth.model';

export class AuthFactory {

    static CreateAuth(): IAuth {
        return new Auth();
    }
}