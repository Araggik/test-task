import { BaseEntity, BaseEntityField, BaseEntityFieldType } from './base-entity.ts';

import { Region } from './region.ts';

export class City extends BaseEntity {
    static childConstructor = Region;
    static entityLabel = 'Город';
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
        {
            label: 'Активно',
            type: BaseEntityFieldType.checkbox,
            validator(value: any) {
                let isValid = false;

                if (typeof value == 'boolean') {
                    isValid = true;
                } 

                return isValid;
            }
        },
    ];
}