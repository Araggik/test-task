import { BaseEntity, BaseEntityField, BaseEntityFieldType } from './base-entity.ts';

export class Device extends BaseEntity {
    static entityLabel = 'Устройство';
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

    childrenMap = undefined;
}