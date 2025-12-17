
let n = 10;


let a = 0;
let b = 1;

console.log(a); 

for (let i = 1; i < n; i++) {
    console.log(b); 
    let next = a + b; 
    a = b;            
    b = next;        
}
console.log("Fibonacci sequence complete.");