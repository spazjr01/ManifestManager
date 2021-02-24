// Other libraries
import { BehaviorSubject } from 'rxjs';

// Manifest Manager classes and components
import { AuthUnit } from '../auth-unit.model';
import { IAuthUnit } from '../interfaces/auth-unit.interface';

export class AuthUnitFactory {

    static CreateEmptyAuthUnit(): IAuthUnit {
        return new AuthUnit();
    }

    static CreateAuthUnit(id: number, uic: string, uicName: string): IAuthUnit {
        let authUnit: IAuthUnit = this.CreateEmptyAuthUnit();
        authUnit.Id = id;
        authUnit.Uic = uic;
        authUnit.UicName = uicName;
        return authUnit;
    }

    static CreateAuthUnitsTemp(): BehaviorSubject<IAuthUnit[]> {
        return new BehaviorSubject<IAuthUnit[]>([]);
    }

    static CreateEmptyAuthUnitsList(): IAuthUnit[] {
        let authUnit: AuthUnit[] = [];
        return authUnit;
    } 
}