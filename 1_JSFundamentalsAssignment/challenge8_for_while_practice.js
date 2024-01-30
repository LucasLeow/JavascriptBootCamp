const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
  }
  
  const calcAverage = function(arr) {
      let i = 0, sum = 0;
      
      while (i < arr.length) {
          sum += arr[i];
          i++;
      }
      
      return sum / arr.length;
  }
  
  /* Write your code below. Good luck! 🙂 */
  
  let bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
  let tips = new Array();
  let totals = new Array();
  
  for (let i = 0; i < bills.length; i++) {
      tips.push(calcTip(bills[i]));
      totals.push(bills[i] + tips[i]);
  }
  
  console.log(calcAverage(totals));