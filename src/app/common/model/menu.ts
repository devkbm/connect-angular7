import { WebResource } from './web-resource';

export class Menu {
    createdDt;
    createdBy;
    modifiedDt;
    modifiedBy;
    menuGroupCode: string;
    menuCode: string;
    menuName: string;
    menuType: string;
    parentMenuCode: string;
    sequence: number;
    level: number;
    resource: WebResource;
}
