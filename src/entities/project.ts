import { BaseEntity, BaseEntityMap, BaseEntityField, BaseEntityFieldType } from './base-entity.ts';

import { City } from './city.ts';

import { Region } from './region.ts';
import { Street } from './street.ts';
import { House } from './house.ts';
import { Entrance } from './entrance.ts';
import { Device } from './device.ts';

export class Project extends BaseEntity {
    static childConstructor = City;
    static entityLabel = 'Проект';
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

    static #storageKey = 'project';

    static #createEntity(constructor: typeof BaseEntity, object: any): BaseEntity {
        let childrenMap: BaseEntityMap | undefined = undefined;

        if (object.childrenMap) {
            childrenMap = {};

            const keys = Object.keys(object.childrenMap);

            for(let key of keys) {
                childrenMap[Number(key)] = this.#createEntity(
                    constructor.childConstructor, 
                    object.childrenMap[key]
                );
            }
        }

        const id = object.id;

        const freeIds = object.freeIds;

        const fieldValues = object.fieldValues ?? {};

        return new constructor({fieldValues, id, childrenMap, freeIds});
    }

    static loadProject(): Project {
        const projectStr = localStorage.getItem(Project.#storageKey);

        if (projectStr) {
            const projectObj = JSON.parse(projectStr);

            return Project.#createEntity(Project, projectObj);
        } else {
            return this.#defaultProject;
        }
    }

    static saveProject(project: Project) {
        localStorage.setItem(Project.#storageKey, JSON.stringify(project));
    }

    static get #defaultProject(): Project {
        return new Project({
            fieldValues: {
                'Название': 'Проект1'
            },
            childrenMap: {
                0: new City({
                    fieldValues: {
                        'Название': 'Пермь',
                        'Активно': true
                    },
                    id: 0,
                    childrenMap: {
                        0: new Region({
                            fieldValues: {
                                'Название': 'Индустриальный'
                            },
                            id: 0,
                            childrenMap: {
                                0: new Street({
                                    fieldValues: {
                                        'Название': 'ш. Космонавтов'
                                    },
                                    id: 0,
                                    childrenMap: {
                                        0: new House({
                                            fieldValues: {
                                                'Номер': '177-1'
                                            },
                                            id: 0,
                                            childrenMap: {
                                                0: new Entrance({
                                                    fieldValues: {
                                                        'Номер': '1'                           
                                                    },
                                                    id: 0,
                                                    childrenMap: {
                                                        0: new Device({
                                                            fieldValues: {
                                                                'Название': 'Устройство 1'
                                                            },
                                                            id: 0
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                }),
                1: new City({
                    fieldValues: {
                        'Название': 'Москва'
                    },
                    id: 1,
                    childrenMap: {
                        0: new Region({
                            fieldValues: {
                                'Название': 'Центральный'
                            }
                        })
                    }
                })
            }
        });
    }
}