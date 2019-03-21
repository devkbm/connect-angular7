export class MenuHierarchy {
    createdDt;
    createdBy;
    modifiedDt;
    modifiedBy;
    key: string;
    title: string;
    menuGroupCode: string;
    menuCode: string;
    menuName: string;
    parentMenuCode: string;
    menuType: string;
    sequence: number;
    level: number;
    url: string;
    selected: boolean;
    expanded: boolean;
    children: MenuHierarchy[];
}
