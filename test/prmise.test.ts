import { describe } from 'mocha';
import PromiseLimit from '../src/index';

const limit = new PromiseLimit(
  // 限制并发数
  2, 
  // 所有resolve统一回调
  (param:any) => {
    console.log('all resolve', param, new Date().getTime());
  }, 
  // 所有reject统一回调
  (msg:any) => {
    console.log('all reject', msg, new Date().getTime());
});

const createPromise = (param:any) => {
  return () => new Promise((resolve, reject) => {
    setTimeout(() => {
      if(Math.random() > 0.5) {
        reject(param);
      }else{
        resolve(param);
      }
    }, 1000);
  });
}
const p1 = createPromise(' 1')
const p2 = createPromise(' 2')
const p3 = createPromise(' 3')
const p4 = createPromise(' 4')
const p5 = createPromise(' 5')

const LimitAdd = () => {
  limit.add(p1,(param)=>{
    console.log('resolve', param, new Date().getTime());
  },(error)=>{
    console.log('reject', error, new Date().getTime());
  });
  limit.add(p2,(param)=>{
    console.log('resolve', param, new Date().getTime());
  },(error)=>{
    console.log('reject', error, new Date().getTime());
  });
  limit.add(p3,(param)=>{
    console.log('resolve', param, new Date().getTime());
  },(error)=>{
    console.log('reject', error, new Date().getTime());
  });
  limit.add(p4,(param)=>{
    console.log('resolve', param, new Date().getTime());
  },(error)=>{
    console.log('reject', error, new Date().getTime());
  });
  limit.add(p5,(param)=>{
    console.log('resolve', param, new Date().getTime());
  },(error)=>{
    console.log('reject', error, new Date().getTime());
  });
}
LimitAdd();

setTimeout(()=>{
  LimitAdd();
},5000);
