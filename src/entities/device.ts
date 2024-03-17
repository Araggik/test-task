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
        {
            label: 'Модель',
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
            label: 'Количество портов',
            type: BaseEntityFieldType.input,
            validator(value: any) {
                let isValid = false;

                if (typeof value == 'string' && isFinite(Number(value))) {
                    isValid = true;
                } 

                return isValid;
            }
        },
        {
            label: 'Активно',
            type: BaseEntityFieldType.checkbox,
            validator() {
                return true;
            }
        },
    ];

    childrenMap = undefined;
}