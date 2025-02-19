export interface cosResponse {
    status: boolean;
    msg?: string;
}

export interface cosResponseData<T = undefined> extends cosResponse {
    data?: T;
}


export interface createCollectionData {
    name: string;
    description: string;
    color: string | '#03a9f4';
}