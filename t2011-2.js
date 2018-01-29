var input;

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', (input) => {


  var reading = false;
  var numbers = [];
  var buffer = "";

  var result = 0;
  var operation = 0;

var init = false;
  for (i = 0; i <= input.length; i++){
    var character = input.charAt(i);

    if(character === "^"){
      operation = 0;
      result = 0;
      buffer = 0;
    }

    if(operation == 0){
      switch (character){
        case "=":
          operation = 1;
          break;
        case "#":
          operation = 2;
          break;
        case "@":
          operation = 3;
          break;
      }
      init = true;
    }

    if(init){

        if( !isNaN(parseInt(character))){
            reading = true;
            buffer = buffer +""+character;
        }else{

          if(reading){
            switch (operation) {
              case 1:
                result = result + parseInt(buffer);
                break;
              case 2:
                if(result != 0){
                  result = result * parseInt(buffer);
                }else{
                  result = parseInt(buffer);
                }
                break;
              case 3:
                if(result != 0){
                  result = result - parseInt(buffer);
                }else{
                  result = parseInt(buffer);
                }
                break;
            }
            buffer = "";
            reading = false;
          }

          if(character === "$"){
            init = false;
            operation = 0;
            console.log(result);
          }
        }
    }
  }
});
