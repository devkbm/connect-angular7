export class BoardHierarchy {
    createdDt;
    createdBy;
    modifiedDt;
    modifiedBy;
    pkBoard: string;
    ppkBoard: string;
    boardName: string;
    boardDescription: string;
    fromDate: Date;
    toDate: Date;
    articleCount: number;
    sequence: number;
    selected: boolean;
    expanded: boolean;
    isLeaf: boolean;
    active: boolean;
    children: BoardHierarchy[];
}
