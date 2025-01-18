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

// limit.add(new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success 3');
//   }, 3000);
// }));
// limit.add(new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success 4');
//   }, 2000);
// }));
// limit.add(new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success 5');
//   }, 2000);
// }));
// describe('Array', function () {
//   before(function () {
//     console.log('before');
//     // 在本describe块中的所有it块之前执行
//   });
//   after(function () {
//     console.log('after');
//     // 在本describe块中的所有it块之后执行
//   });
//   beforeEach(function () {
//     console.log('beforeEach');
//     // 在本describe块中的每个it块之前执行
//   });
//   afterEach(function () {
//     console.log('afterEach');
//     // 在本describe块中的每个it块之后执行
//   });
//   it('should have a length property', function () {
//     // 测试用例
//   });
//   it('should be able to push elements', function () {
//     // 测试用例
//   });
// });
