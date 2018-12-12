const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const sortWithSwap = (input, size) => {
  let arr = input;
  let sorted = [ ...input ];
  sorted = sorted.sort();
  let unmatchedCount = 0;
  let unmatchedIndex = [];

  for(let i=0; i<size; i++){
    if(arr[i] != sorted[i]){
      unmatchedIndex.push(i + 1)
      unmatchedCount++;
    }
  }

  if(unmatchedCount === 0){
    console.log('yes');
    return true;
  }
  else if(unmatchedCount === 2){
    console.log('yes');
    console.log('swap ' + unmatchedIndex[0] + ' ' + unmatchedIndex[1]);
    return true;
  }
  else{
    return false;
  }
};

const sortWithReverse = (input, size) => {
  let arr = input;
  let sorted = [ ...input ];
  sorted = sorted.sort();
  let reverseCandidate = [];
  let reverseIndexStart;
  let reverseIndexEnd;
  let candidateDetected = false;
  let doneChecking = false;
  let sortFailed = false;

  for(let i=1; i<size; i++){
    if(arr[i-1] > arr[i]){
      candidateDetected = true;
      if(reverseCandidate.length === 0){
        reverseIndexStart = i;
        reverseCandidate.push(arr[i-1]);
      }
      reverseCandidate.push(arr[i]);
    }
    else {
      if(candidateDetected){
        reverseIndexEnd = i;
        doneChecking = true;
        break;
      }
    }
  }

  if(doneChecking){
    for(let i=0; i<size; i++){
      if(i < (reverseIndexStart - 1) || i > (reverseIndexEnd - 1)){
        if(arr[i] !== sorted[i]){
          sortFailed = true;
          console.log('no');
          return false;
        }
      }
    }
    console.log('yes');
    console.log('reverse ' + reverseIndexStart + ' ' + reverseIndexEnd);
  }

  return true;
};

rl.question('Input the size of array: ', (size) => {
  rl.question('Define the array separated by space: ', (arr) => {
    let toArray = arr.split(' ');

    if(!sortWithSwap(toArray, size)){
      sortWithReverse(toArray, size);
    }
    
    rl.close();
  });
});