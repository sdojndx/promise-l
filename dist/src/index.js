"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PromiseLimit {
    constructor(limit, callbackWhenResolve, callbackWhenReject) {
        this.queue = [];
        this.running = 0;
        this.callbackWhenResolve = callbackWhenResolve;
        this.callbackWhenReject = callbackWhenReject;
        this.limit = limit;
    }
    run() {
        if (this.queue.length === 0) {
            return;
        }
        if (this.running >= this.limit) {
            return;
        }
        const task = this.queue.shift();
        if (!(task === null || task === void 0 ? void 0 : task.length)) {
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
            if (task[2]) {
                task[2](msg);
            }
            if (this.callbackWhenReject) {
                this.callbackWhenReject(msg);
            }
            this.run();
        });
    }
    add(task, resolve, reject) {
        this.queue.push([task, resolve, reject]);
        this.run();
    }
}
exports.default = PromiseLimit;
