export class CommonCodeHierarchy {
    id: string;
    code: string;
    codeName: string;
    codeNameAbbreviation: string;
    fromDate: string;
    toDate: string;
    hierarchyLevel: number;
    fixedLengthYn: boolean;
    codeLength: number;
    cmt: string;
    parentId: string;

    title: string;
    key: string;
    isLeaf: boolean;
    children: CommonCodeHierarchy[];
}
