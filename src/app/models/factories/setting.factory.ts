// Manifest Manager classes and components
import { ISetting } from '../interfaces/setting.interface';
import { Setting } from '../setting.model';

export class SettingFactory {

    static CreatingEmptySetting(): ISetting {
        return new Setting();
    }

    static CreateSetting(settingId: number, name: string, active: boolean, description: string): ISetting {
        let setting = new Setting();
        setting.SettingId = settingId;
        setting.Name = name;
        setting.Active = active;
        setting.Description = description;
        return setting;
    }
}