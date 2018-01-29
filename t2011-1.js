var input;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', (input) => {

  var reading = false;
  var numbers = [];
  var buffer = "";
  var negative = false;

  var result = 0;

  for (i = 0; i <= input.length; i++){
    var character = input.charAt(i);
    if( !isNaN(parseInt(character))){
        reading = true;
        buffer = buffer +""+character;
    }else{
      if(character === "-"){
        negative = true;
      }

      if(reading){

        if(!negative){
          result = result + parseInt(buffer);
        }else{
          result = result - parseInt(buffer);
        }

        buffer = "";
        reading = false;
        negative = false;
      }
    }
  }

  console.log(result);
});
