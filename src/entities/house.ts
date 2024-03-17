import { BaseEntity, BaseEntityField, BaseEntityFieldType } from './base-entity.ts';

import { Entrance } from './entrance.ts';

export class House extends BaseEntity {
    static childConstructor = Entrance;
    static entityLabel = 'Дом';
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