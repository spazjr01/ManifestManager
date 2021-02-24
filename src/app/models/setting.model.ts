// Manifest Manager classes and components
import { ISetting } from './interfaces/setting.interface';

export class Setting implements ISetting {
    SettingId: number;
    Name: string;
    Active: boolean;
    Description: string;
    UserId: string;
    UpdateDateTime: string;

    constructor() {
        this.SettingId = -1;
        this.Name = '';
        this.Active = false;
        this.Description = '';
        this.UserId = '';
        this.UpdateDateTime = '';
    }
}