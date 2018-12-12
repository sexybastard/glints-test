const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input N: ', (input) => {
  let answer = 1;
  for(let i=0; i<input; i++){
    answer = answer * (input - i);
  }

  console.log('Your factorial result: ' + answer);

  rl.close();
});