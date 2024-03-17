import { BaseEntity, BaseEntityField, BaseEntityFieldType } from './base-entity.ts';

import { House } from './house.ts';

export class Street extends BaseEntity {
    static childConstructor = House;
    static entityLabel = 'Улица';
    static entityFields: Array<BaseEntityField> = [
        {
            label: 'Название',
            type: BaseEntityFieldType.input,
            validator(value: any) {
                let isValid = false;

                if (typeof value == 'string' && value.length > 1) {
                    isValid = true;
                } 

                return isValid;
            }
        },
    ];
}