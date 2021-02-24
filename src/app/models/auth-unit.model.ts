import { IAuthUnit } from './interfaces/auth-unit.interface';

export class AuthUnit implements IAuthUnit{

    Id: number;
    Uic: string;
    UicName: string;

    constructor() {
        this.Id = -1;
        this.Uic = '';
        this.UicName = '';
    }
}
