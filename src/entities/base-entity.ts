export interface BaseEntityMap {
    [key: number]: BaseEntity
}

export enum BaseEntityFieldType {
    input,
    checkbox
}

export interface BaseEntityField {
    label: string,
    type: BaseEntityFieldType,
    validator: (value: any) => boolean
}

interface BaseEntityFieldValueMap {
    [key: string]: string | boolean
}


export class BaseEntity {
    static childConstructor = BaseEntity;
    static entityLabel: string = 'BaseEntity';
    static entityFields: Array<BaseEntityField> = [];
    
    freeIds: Array<number> = [];

    id: number | undefined = undefined;

    fieldValues: BaseEntityFieldValueMap = {};

    childrenMap: BaseEntityMap | undefined = {};

    get childrenCount() {
        if (this.childrenMap) {
            return Object.keys(this.childrenMap).length;
        } else {
            return 0;
        }  
    }

    constructor(params: {fieldValues: BaseEntityFieldValueMap, id?: number,
        childrenMap?: BaseEntityMap, 
        freeIds?: Array<number>
    }) {
        this.fieldValues = params.fieldValues;

        this.id = params.id;

        if (params.childrenMap) {
            this.childrenMap = params.childrenMap;
        }

        if (params.freeIds) {
            this.freeIds = params.freeIds;
        }
    }

    removeChild(id: number) {
        if (this.childrenMap) {
            if (id in this.childrenMap) {
                delete this.childrenMap[id];
    
                this.freeIds.push(id);
            }
        }
    }

    addChild(child: BaseEntity) {
        if (this.childrenMap) {
            if (this.freeIds.length > 0) {
                const id = this.freeIds.pop();
    
                child.id = id;
            } else {
                child.id = this.childrenCount;
            }
    
            this.childrenMap[child.id!] = child;
        } 
    }

    changeFieldValues(fieldValues: BaseEntityFieldValueMap) {
        this.fieldValues = fieldValues;
    }
}