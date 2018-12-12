const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input nummber of [rows] [columns] [rotations]: ', (input) => {
  let temp = input.split(' ');
  let rows = temp[0];
  let columns = temp[1];
  let rotations = temp[2];

  askQuestions(rows).then((response) => {
    let to2DimensionArr = [];
    response.forEach((item, index) => {
      to2DimensionArr[index] = item.split(' ');
    });

    rotate(to2DimensionArr, rows, columns, rotations);
  }).catch((err) => {
    console.log(err);
  });

});

const askQuestions = (rows) => {
  return new Promise( (res, rej) => {
    let chain = Promise.resolve([]);

    for(let i=0; i<rows; i++){
      chain = chain.then( answers => new Promise((resChild, rejChild) => {
          rl.question("Input column for row " + (i+1) + ": ", answer => {
            answers.push(answer);
            resChild(answers);
          });
        })
      );
    }

    chain.then((answers) => {
      rl.close();
      res(answers);
    })
  });
};

const getCircuits = (arr, rows, columns) => {
  let modifiedArr = [];
  let numberOfLine = rows <= columns ? rows/2 : columns/2;
  for(let i=0; i<numberOfLine; i++){
    let keepGoing = true, curr = 0, yIdx = i, xIdx = i, tempArr = [];
    while(keepGoing){
      if(curr < (columns-2*i)){
        if(curr !== 0){
          xIdx++;
        }
        tempArr.push(arr[yIdx][xIdx]);
      }
      else if(curr < ((columns-2*i) + (rows-2*i - 1))){
        yIdx++;
        tempArr.push(arr[yIdx][xIdx]);
      }
      else if(curr < ((columns-2*i) + ((rows-2*i) - 2) + (columns-2*i))){
        xIdx--;
        tempArr.push(arr[yIdx][xIdx]);
      }
      else if(curr < (columns-2*i)*2 + (rows-2*i-2)*2){
        yIdx--;
        tempArr.push(arr[yIdx][xIdx]);
      }
      else{
        keepGoing = false;
      }
      curr++;
    }
    modifiedArr.push(tempArr);
  }

  return modifiedArr;
}

const reshape = (arr, arrResult, rows, columns) => {
  for(let rowIdx=0; rowIdx<arr.length; rowIdx++){
    let curr = 0, yIdx = rowIdx, xIdx = rowIdx;
    for(let colIdx=0; colIdx<arr[rowIdx].length; colIdx++){
      if(curr < (columns-2*rowIdx)){
        if(curr !== 0){
          xIdx++;
        }
        arrResult[yIdx][xIdx] = arr[rowIdx][colIdx];
      }
      else if(curr < ((columns-2*rowIdx) + (rows-2*rowIdx - 1))){
        yIdx++;
        arrResult[yIdx][xIdx] = arr[rowIdx][colIdx];
      }
      else if(curr < ((columns-2*rowIdx) + ((rows-2*rowIdx) - 2) + (columns-2*rowIdx))){
        xIdx--;
        arrResult[yIdx][xIdx] = arr[rowIdx][colIdx];
      }
      else if(curr < (columns-2*rowIdx)*2 + (rows-2*rowIdx-2)*2){
        yIdx--;
        arrResult[yIdx][xIdx] = arr[rowIdx][colIdx];
      }
      curr++;
    }
  }

  return arrResult;
}

const rotate = (arr, rows, columns, times) => {
  let modifiedArr = getCircuits(arr, rows, columns);

  for(let i=0; i<times; i++){
    for(let idx=0; idx<modifiedArr.length; idx++){
      let temp = modifiedArr[idx].slice(1);
      modifiedArr[idx] = [...temp, modifiedArr[idx][0]];
    }
  }

  let resultArr = reshape(modifiedArr, arr, rows, columns)
  for(let y=0; y<rows; y++){
    let tobePrinted = '';
    resultArr[y].map((x) => {
      tobePrinted += (x + ' ');
    })
    console.log(tobePrinted)
  }
};