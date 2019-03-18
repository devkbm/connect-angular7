import { Program } from './Program';

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
    program: Program;
}
