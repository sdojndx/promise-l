export default class PromiseLimit {
    private limit;
    private queue;
    private running;
    private callbackWhenResolve?;
    private callbackWhenReject?;
    constructor(limit: number, callbackWhenResolve?: Function, callbackWhenReject?: Function);
    private run;
    add(task: () => Promise<any>, resolve?: (resolve: any) => void, reject?: (reject: any) => void): void;
}
