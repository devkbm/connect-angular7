export class ResponseObject<T> {
    total: number;
    success: boolean;
    message: string;
    data: T;
}
