import { ArticleCheck } from './article-check';

export class Article {
    pkArticle: number;
    fkBoard: number;
    ppkArticle: number;
    title: string;
    contents: string;
    pwd: string;
    hitCnt: string;
    fromDate: string;
    toDate: string;
    seq: number;
    depth: number;
    articleChecks: ArticleCheck[];
    fileList: string[];
    file: File;
    editable: boolean;
}
