/*
* ACLARACIÓN DE FUNCIONAMIENTO
* Matriz de resolucion:
* Matriz de 10 x cifras
* Cada fila representa a un numero [0,9]
* Cada columna represnta cada una de las cifras del código generado
* La posicion numero,cifra por defecto es 0. Cuando una pista da a conocer una cifra del código, se rellena con un 1
* El programa se ejecuta hasta que la matriz sea todo 0
* Funciona con numeros de cualquier cifra
*/

const cifras = 3; // Numero de cifras del código
const maxTries = 15;//Evitar repeticiones de pistas ya dadas

let input;
let codigo,codigoCifras = [];
let numero;

let matrizSolucion;

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
});

initGame();
//Leer teclado
rl.on('line', (input) => {
    //Comandos simples para interactuar con el juego
    if(input === "ver"){
      console.log("El código es "+getCuadros(codigoCifras))
    }else if(input === "otro"){
      initGame();
    }else{
      if(input === codigo){
        console.log("Has ganado, escribe 'otro' para seguir jugando")
      }
    }
});

//Iniciar el juego
function initGame(){

  //Generacion de un número aleatorio
  codigo = generateNumber(cifras).toString();
  if(codigo.length != cifras){
    initGame();
    return;
  }
  //Separar numero aleatorio por cifras
  for(i = 0; i<codigo.length; i++){
    codigoCifras[i] = codigo.charAt(i);
  }

  //Limpiar pantalla
  process.stdout.write('\033c');
  console.log("        __-::..")
  console.log("     _/ _/ _/':.")
  console.log("    / // // / ':.")
  console.log("   / // // /   ::.")
  console.log("  =========     ::")
  console.log(" / // // /       ::          ¿Cual es el código que desactiva la bomba?")
  console.log("/ // // /        ::          "+getCuadros())
  console.log("(_)(_)(_)        ::.")
  console.log(" (_)(_)           ::")
  console.log("  (_)             **")
  console.log("");
  console.log("");
  console.log("Pistas");

  //Crear matriz de resolucion
  matrizSolucion = [];
  for(i = 0; i < 10; i++){
    matrizSolucion[i] = []
    for(j = 0; j < cifras; j++){
      matrizSolucion[i][j] = 0;
    }
  }

  //Mientras el problema no sea resolube, mostrar más pistas
  while(!checkResolve()){
    if(Math.random() <= 0.5){
      pista1()
    }else{
      pista2()
    }
  }
}

function pista1(){
    //Nada es correcto -- OK
    let numbers = [];

    for(i = 0; i< cifras; i++){
      let posicion = i;

      let solved = false;
      let tries = 0;
      //Evitar repetir mismos números en mismas posiciones
      while(!solved){
        let number = getIncorrectNumber();

        let appear;
        //Evita repetir numeros que ya se conocen
        if(tries < maxTries){
          appear = matrizSolucion[number][posicion];
        }else{
          //Pero si no hay mas remedio repite un numero
          appear = 0;
        }

        if(appear == 0){//No ha aparecido el numero aún
          solved = true
          numbers.push(number);
          //Tachamos todas las posiciones del numero. Es un numero no valido
          matrizSolucion[number] = new Array(3).fill(1)
        }
        tries++;
      }
    }
    console.log(getCuadros(numbers)+" Nada es correcto");
}

function pista2(){
  //Numero correcto y bien ubicado -- OK

  let numbers = []
  let number
  correcto = selectCifraRand();
  for(i =0 ; i < cifras; i++){
    if(i == correcto){
      number = codigoCifras[i]
      numbers.push(codigoCifras[i])
    }else{
      let incorrect = false;
      let tries = 0;

      while(!incorrect){
        //Generamos un numero
        number = generateNumber(1);
        if(number.toString().length == 1){
          //Comprobar lo primero que el numero es incorrecto.
          if(codigoCifras[i] != number){

            let appear;
            //Evita repetir numeros que ya se conocen
            if(tries < maxTries){
              appear = matrizSolucion[number][i];
            }else{
              //Pero si no hay mas remedio repite un numero
              appear = 0;
            }

            if(appear == 0){
              numbers.push(number);
              incorrect = true;
            }
              tries++;
            }
        }
      }
    }
    //Marcamos como resuelto
    matrizSolucion[number][i] = 1;
  }

  console.log(getCuadros(numbers)+" Un numero es correcto y esta bien ubicado");
}


//Comprobar resolucion de problema
function checkResolve(){
  //Si la matrizSolucion Tiene algun campo en 0 devolvemos false
  for(i = 0; i < 10; i++){
    for(j = 0; j < cifras; j++){
      if(matrizSolucion[i][j] == 0){
        return false;
      }
    }
  }
  return true;
}

//Funciones auxiliares para obtener datos aleatorios

function getIncorrectNumber(){
  while(true){
    let random = Math.trunc(Math.random()*10).toString();
    if(codigo.indexOf(random) == -1){
      return random;
    }
  }
}
function checkIncorrect(cifra){
  return codigo.indexOf(random) == -1
}



function getCuadros(array){
  let cuadros = ""
  for(i =0 ; i < cifras; i++){
    if(array != undefined){
      cuadros = cuadros + "[ "+array[i]+" ] ";
    }else{
      cuadros = cuadros + "[ ] ";
    }
  }
  return cuadros;
}


function generateNumber(n) {
  //https://stackoverflow.com/questions/21816595/generate-a-random-number-of-fixed-length-using-javascript
        var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

        if ( n > max ) {
                return generate(max) + generate(n - max);
        }

        max        = Math.pow(10, n+add);
        var min    = max/10; // Math.pow(10, n) basically
        var number = Math.floor( Math.random() * (max - min + 1) ) + min;

        return ("" + number).substring(add);
}

function selectCifraRand(){
  return Math.floor(Math.random()*cifras);
}
function selectPistaRand(){
  return Math.floor(Math.random() * 2) + 1
}
