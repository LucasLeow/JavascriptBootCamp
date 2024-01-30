/* Write your code below. Good luck! 🙂 */

const calcTip = function(bill) {
    return (bill >= 50) && (bill <= 300) ? bill * 0.15 : bill * 0.2;
}

let bills = [125, 555, 44];
let tips = new Array();
let totals = new Array();

bills.forEach((bill) => {
    tips.push(calcTip(bill));
})

for (let i = 0; i < bills.length; i++) {
    totals.push(bills[i] + tips[i]);
}

console.log(bills);
console.log(tips);
console.log(totals);