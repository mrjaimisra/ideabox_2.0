function doubleNumber (num) {
  return num * 2
}

var timesTwo = doubleNumber(2);
console.log('Result: ' + timesTwo);
console.log('Name: ' + timesTwo.name);

function logFoo() {
  console.log(typeof this);
}

var bar = {
  foo: "Yo",
  log: logFoo
};

var baz = {
  foo: "Momma",
  log: logFoo
};

bar.log();

baz.log();