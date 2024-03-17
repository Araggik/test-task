import { BaseEntity, BaseEntityField, BaseEntityFieldType } from './base-entity.ts';

import { Street } from './street.ts';

export class Region extends BaseEntity {
    static childConstructor = Street;
    static entityLabel = 'Район';
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