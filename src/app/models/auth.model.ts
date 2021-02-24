// Manifest Manager classes and components
import { IAuth } from './interfaces/auth.interface';

export class Auth implements IAuth {
    UserId: string;
    Token: string;
    ExpirationDtm: Date;

    constructor() {
        this.UserId = '';
        this.Token = '';
        this.ExpirationDtm = new Date();
        this.ExpirationDtm.setDate(this.ExpirationDtm.getDate() + 1);
    }
}