// Manifest Manager classes and components
import { IPerson } from './interfaces/person.interface';
import { Source, AddResult, BarcodeType } from './../shared/enumerations/enumerations';

export class Person implements IPerson {

    ManifestID: number;
    ScannedText: string;
    Edipi: string;
    Ssn: string;
    SpotID: string;
    LoaNumber: string;
    LastName: string;
    FirstName: string;
    MiddleName: string;
    PersonTypeCode: string;
    PersonTypeValue: string;
    DisplayPersonTypeValue: string;
    DodServiceComponentCode: string;
    DodServiceComponentValue: string;
    MilitaryServiceComponentCode: string;
    MilitaryServiceComponentValue: string;
    DisplayMilitaryServiceComponentValue: string;
    MilitaryPersonnelClassCode: string;
    MilitaryPersonnelClassValue: string;
    RankCode: string;
    RankAbbeviation: string;
    RankValue: string;
    PotentialGainingUic: string;
    Pmos: string;
    Asi: string;
    SexCode: string;
    BirthDate: string;
    Source: Source;
    AddResult: AddResult;
    BarcodeType: BarcodeType;
    PersonID: number;
    UserId: string;
    UpdateDateTime: string;
    ShowDetails: boolean;

    constructor() {
        this.ManifestID = -1;
        this.Edipi = '';
        this.Ssn = '';
        this.SpotID = '';
        this.LoaNumber = '';
        this.LastName = '';
        this.FirstName = '';
        this.MiddleName = '';
        this.PersonTypeCode = '';
        this.PersonTypeValue = '';
        this.DodServiceComponentCode = '';
        this.DodServiceComponentValue = '';
        this.MilitaryServiceComponentCode = '';
        this.MilitaryServiceComponentValue = '';
        this.MilitaryPersonnelClassCode = '';
        this.MilitaryPersonnelClassValue = '';
        this.RankCode = '';
        this.RankAbbeviation = '';
        this.RankValue = '';
        this.PotentialGainingUic = '';
        this.Pmos = '';
        this.Asi = '';
        this.SexCode = '';
        this.BirthDate = '';
        this.Source = Source.NOT_SET;
        this.AddResult = AddResult.NOT_SET;
        this.BarcodeType = BarcodeType.NonBarcode;
        this.PersonID = -1;
        this.UserId = '';
        this.UpdateDateTime = '';
        this.ShowDetails = false;
    }
}
