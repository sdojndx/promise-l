export default class PromiseLimit {
  private limit: number;
  private queue: Array<[()=>Promise<any>,((resolve:any)=>void)|undefined,((reject:any)=>void)|undefined]> = [];
  private running: number = 0;
  private callbackWhenResolve?: Function;
  private callbackWhenReject?: Function;

  constructor(limit: number, callbackWhenResolve?: Function, callbackWhenReject?: Function) {
    this.callbackWhenResolve = callbackWhenResolve;
    this.callbackWhenReject = callbackWhenReject;
    this.limit = limit;
  }

  private run() {
    if (this.queue.length === 0) {
      return;
    }
    if (this.running >= this.limit) {
      return;
    }
    const task = this.queue.shift();
    if(!task?.length) {
      this.run();
      return;
    }
    this.running++;
    task[0]().then((param) => {
      this.running--;
      if (task[1]) {
        task[1](param);
      }
      if (this.callbackWhenResolve) {
        this.callbackWhenResolve(param);
      }
      this.run();
    }).catch((msg) => {
      this.running--;
      if(task[2]) {
        task[2](msg);
      }
      if (this.callbackWhenReject) {
        this.callbackWhenReject(msg);
      }
      this.run();
    });
  }

  public add(task: ()=>Promise<any>, resolve?: (resolve:any)=>void, reject?: (reject:any)=>void) {
    this.queue.push([task, resolve, reject]);
    this.run();
  }
}
