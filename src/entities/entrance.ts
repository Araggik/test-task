import { BaseEntity, BaseEntityField, BaseEntityFieldType } from './base-entity.ts';

import { Device } from './device.ts';

export class Entrance extends BaseEntity {
    static childConstructor = Device;
    static entityLabel = 'Подъезд';
    static entityFields: Array<BaseEntityField> = [
        {
            label: 'Номер',
            type: BaseEntityFieldType.input,
            validator(value: any) {
                let isValid = false;

                if (typeof value == 'string' && value.length > 0) {
                    isValid = true;
                } 

                return isValid;
            }
        },
    ];
}