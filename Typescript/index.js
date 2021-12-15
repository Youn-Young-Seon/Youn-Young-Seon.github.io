"use strict";
// let userName = '이름';
// let age = 28;
// let country = '서울';
// let favorite : {song: string, singer: string} = {song: 'waterPicture', singer: 'MC.THE.MAX'}
// let ProjectType: {
//     member: string[],
//     days: number,
//     started: boolean
// }
// let project: {
//     member: string[],
//     days: number,
//     started: boolean
// } = {
//     member: ['kim', 'park'],
//     days: 30,
//     started: true
// }
// let 회원들 :(number | string)[] = [1,'2',3]
// let 오브젝트 : {a:string | number} = {a: 123}
// let user :string = 'kim';
// let age :undefined | number = undefined;
// let married :boolean = false;
// let 철수 :(string | undefined | number | boolean)[] = [user, age, married];
// let 학교 : {
//     score :(number | boolean)[]
//     teacher :string
//     friend :string | string[]
// } = {
//     score: [100, 97, 84],
//     teacher: 'Phil',
//     friend: 'John'
// }
// 학교.score[4] = false;
// 학교.friend = ['Lee', 학교.teacher]
// function 내함수(x :number|string){
//     if(typeof x === 'string'){
//         return x + '1';
//     }else{
//         return x + 1;
//     }
// }
// 내함수(123);
// function introduce(name? :string) :void{
//     if(name){
//         console.log(`안녕하세요 ${name}`);
//     }else{
//         console.log(`이름이 없습니다.`);
//     }
// }
// function inputLength(x :string | number): number{    
//     return x.toString().length;
// }
// function 결혼가능하냐(월소득: number, 집보유여부: boolean, 매력점수: "상" | "중" | "하") :string | void{
//     let total :number = 0;
//     total += 월소득;
//     if(집보유여부 === true){
//         total += 500;
//     }
//     if(매력점수 === '상'){
//         total += 100;
//     }
//     if(total >= 600){
//         return '결혼가능';
//     }
// }
// console.log(결혼가능하냐(700, false, '중'));
// 결혼가능하냐(100, false, '상');
// function 클리닝함수(arr :(string|number)[]) :number[]{
//     let newArr = arr.map((a) => {
//         if(typeof a === 'string'){
//             return parseInt(a);
//         }else{
//             return a;
//         }
//     })
//     return newArr;
// }
// 클리닝함수(test);
// let 철수쌤 = { subject : 'math' }
// let 영희쌤 = { subject : ['science', 'english'] }
// let 민수쌤 = { subject : ['science', 'art', 'korean'] }
// function 만들함수(obj :{ subject: string|string[] }) :string{
//     if(Array.isArray(obj.subject)){
//         return obj.subject[obj.subject.length-1];
//     }else if(typeof obj.subject === 'string'){
//         return obj.subject;
//     }else{}
// }
// 만들함수(철수쌤);
// 만들함수(영희쌤);
// 만들함수(민수쌤);
// type Type1 = {
//     attr1 :number,
//     attr2 :string
// }
// type Type2 = {
//     attr1 :number,
//     attr3 :boolean
// }
// let testType :Type1&Type2 = {
//     attr1: 123,
//     attr2: "이름",
//     attr3: true
// };
// type TestCss = {
//     color? :string,
//     size: number,
//     readonly position: number[]
// }
// let testValue = {
//     size: 123,
//     position: [1,2,3]
// }
// type Profile = {
//     name :string,
//     phone: number,
//     email: string
// }
// let testUser: Profile = {
//     name: "이름",
//     phone: 123,
//     email: "test@test.com"
// }
// type AdultCheck = {
//     ageCheck :boolean
// }
// type NewUser = Profile&AdultCheck;
// let testUser2 :NewUser = {
//     name: "이름",
//     phone: 123,
//     email: "test@test.com",
//     ageCheck: true    
// }
// type babo = '가위'|'바위'|'보';
// function gababo(x: babo) :babo[]{    
//     let newArr = [x]
//     return newArr;
// }
// var 자료 = {
//     name: 'kim'
// } as const
// function 내함수(a: 'kim'){
// }
// 내함수(자료.name);
// type 함수타입 = (a :string) => number;
// let 함수 :함수타입 = function(a){
//     return 1;
// }
// type 회원정보타입 = {
//     name: string,
//     plusOne: (a: number) => number,
//     changeName: () => void
// };
// let 회원정보 :회원정보타입 = {
//     name: 'kim',
//     plusOne(a: number): number{
//         return a + 1;
//     },
//     changeName: () => {
//         console.log('안녕');
//     }
// };
// 회원정보.plusOne(1);
// 회원정보.changeName();
// type publicFunc = (str: string) => number | string;
// function cutZero(str: string) :string{
//     if(str[0] === '0'){
//         return str.slice(1, str.length);
//     }else{
//         return str;
//     }
// }
// function removeDash(str: string) :number{
//     let newStr: string = str.replace(/-/g, '');    
//     let strToNum: number = parseInt(newStr);    
//     return strToNum;
// }
// function pureNumber(str :string, func1 :publicFunc, func2 :publicFunc): number{
//     // let resultStr = func1(str) as string;    
//     return func2(func1(str) as string) as number;    
// }
// let 제목 = document.querySelector('#title'); //as Element;
// if(제목 != null){
//     제목.innerHTML = '반가우요';
// }
// if(제목 instanceof Element){
//     제목.innerHTML = '반가우요';
// }
// 제목.innerHTML = '반가우요';
// if(제목?.innerHTML != undefined){
//     제목.innerHTML = '반가우요';
// }
// let 링크 = document.querySelector('.link');
// if(링크 instanceof HTMLAnchorElement){
//     링크.href = 'https://kakao.com'
// }
// let 버튼 = document.querySelector('#button');
// 버튼?.addEventListener('click', function(){
// })
// let changeIMG = document.querySelector('#image');
// if(changeIMG instanceof HTMLImageElement){
//     changeIMG.src = 'new.jpg';
// }    
// let changeAnchor = document.querySelectorAll('.naver');
// changeAnchor.forEach((a) => {
//     if(a instanceof HTMLAnchorElement){
//         a.href = 'https://kakao.com'
//     }
// })
// class Person{
//     name :string
//     constructor(){
//         this.name = 'kim';    
//     }
// }
// let 사람1 = new Person();
// let 사람2 = new Person();
// class Car{
//     model;
//     price;
//     constructor(model :string, price :number){
//         this.model = model;
//         this.price = price;
//     }
//     tax() :number{
//         return (this.price / 10);
//     }
// }
// let car1 = new Car('소나타', 3000);
// console.log(car1);
// console.log(car1.tax());
// class Word{
//     num :number[];
//     str :string[];
//     constructor(...rest :(number|string)[]){
//         this.num = [];
//         this.str = [];        
//         rest.forEach((a) => {
//             if(typeof a === 'number'){
//                 this.num.push(a);
//             }else if(typeof a === 'string'){
//                 this.str.push(a);
//             }else{}            
//         });
//     }
// }
// let obj = new Word('kim', 3, 5, 'park', 8, 9, 1, 'ddd', '123', 324);
// console.log(obj.num);
// console.log(obj.str);
// type Animal = {name: string}
// type Cat = {age: number} & Animal
// interface Student {
//     name: string
// }
// interface Teacher extends Student {    
//     age: number
// }
// let 학생: Student = {name: 'kim'}
// let 선생: Teacher = {name: 'kim', age: 20 }
// interface Product {
//     brand: string,
//     serialNumber: number,
//     model: string[]
// }
// let 상품 :Product = { brand: 'Samsung', serialNumber: 1360, model: ['TV', 'phone']};
// interface Card{
//     card?: boolean
// }
// interface Cartegory extends Card{
//     product: string,
//     price: number
// }
// let 장바구니 :Cartegory[] = [{ product: '청소기', price: 7000, card: false}, {product: '삼다수', price: 800}];
// interface inter{
//     plus: (a: number, b :number) => number,
//     minus: (a: number, b :number) => number
// }
// let obj :inter = {
//     plus: function(a, b) :number{
//         return a + b;
//     },
//     minus: (a, b) => {
//         return a - b;
//     }
// }
// obj.plus(10, 5);
// obj.minus(10, 5);
