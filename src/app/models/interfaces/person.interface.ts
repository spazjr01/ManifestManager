// Manifest Manager classes and component
import { IBaseModel } from './base-model.interfaces';
import { Source, AddResult, BarcodeType } from './../../shared/enumerations/enumerations';

export interface IPerson extends IBaseModel {
    Source: Source;
    AddResult: AddResult;
    BarcodeType: BarcodeType;
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
    PersonID: number;
    ShowDetails: boolean;
}
