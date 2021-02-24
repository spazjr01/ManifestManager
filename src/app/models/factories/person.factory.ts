// Manifest Manager classes and components
import { Person } from '../person.model';
import { IPerson } from '../interfaces/person.interface';
import { Source } from '../../shared/enumerations/enumerations';

export class PersonFactory {

    static CreateGenericPerson(): IPerson {
        let person: IPerson = new Person();
        person.BirthDate = '0001-01-01T00:00:00';

        return person;
    }

    static CreatePersonFromID(manifestId: number, edipi: string, userId: string): IPerson {
        let person: IPerson = this.CreateGenericPerson();
        person.ManifestID = manifestId;
        person.Edipi = edipi;
        person.UserId = userId;
        person.Source = Source.EDIPI;
        return person;
    }

    static CreatePersonFromScan(manifestId: number, scannedText: string, userId: string): IPerson {
        let person: IPerson = this.CreateGenericPerson();
        person.ManifestID = manifestId;
        person.ScannedText = scannedText;
        person.UserId = userId;
        person.Source = Source.SCAN
        return person;
    }

    static CreatePersonList(): IPerson[] {
        let personList: IPerson[] = [];
        return personList
    }
}