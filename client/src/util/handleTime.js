let date = new Date();
let dd = date.getDate();
let mm = date.getMonth() + 1; //January is 0!
let yyyy = date.getFullYear();

//The actual day
let jj = dd;
let xx = mm;

if (jj < 10) {
  jj = "0" + jj;
}
if (xx < 10) {
  xx = "0" + xx;
}

const today = yyyy + "-" + xx + "-" + jj; //always having the value of the same date we are visiting the website

//

let hh = date.getHours();

let nextDayTime = false; // true if we have to point to the next day in the calendar

//if it is not work time then make the default time point to 8h ---> 9h
if ((16 < hh && hh <= 23) || (0 <= hh && hh < 7)) {
  if (16 < hh && hh <= 23) {
    dd = dd + 1; //when it is after 17h00 and before 00h00, make the calendar point to the next day
  }
  nextDayTime = true;
}
//day and month format
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}

const minDay = yyyy + "-" + mm + "-" + dd; //can be today or the next day if there's no more time to reserve today

export { minDay, today, hh, nextDayTime };
