
const lado = 50 //Dimensiones del plano 50x50 en este caso.
const obstaculo = '*' //Caracter usado para representar obstaculos
const robots = ['A','B','C','D','E','F','G','H'] //Robots exploradores A,B,C....
const refresco = 100 //Tasa de refresco (milisegundos)
const ejes = true; //Mostrar ejes
const maxTries = 7; //Numero de intentos máximos para obtener las nuevas coordenadas de un robot

//Generacion del plano

let map = [];
for(x = 0; x < lado; x++){
  map[x] = []
  for(y = 0; y < lado; y++){
    map[x][y] = ".";
  }
}

function moveRobots(){
  // Movemos cada robot de manera individual
  for(i = 0; i<robots.length; i++){
    let robot = robots[i];
    let currentCoords = getRobotCoord(robot)
    //Buscamos un movimiento valido
    let newCords = getNewCords(currentCoords,getDirection());
    //Medida de seguridad por si un robot se queda atrapado
    let tries = 0;
    while(newCords == false){
      if (tries <= maxTries){
        newCords = getNewCords(currentCoords,getDirection());
      }else{
        //En caso de quedarse atrapado, el robot no se mueve
        newCords = currentCoords;
      }
      tries++;
    }
    //Establecemos nuevas coordenadas al robot
    setRobotCoord(robot,currentCoords,newCords);
  }
  //Mostrar en pantalla los cambios
  render();
  //Volver a ejecutar esta funcion transcurrido el tiempo de refresco
  setTimeout(moveRobots,refresco);
}

//Obtención de la direccion aleatoria que ha de seguir el robot.
function getDirection(){
  var rand = Math.random();
  if(rand < 0.25){
    return "N";
  }else if(rand >= 0.25 && rand < 0.50){
    return "S";
  }else if(rand >= 0.50 && rand < 0.75){
    return "E";
  }else{
    return "W";
  }
}

//Obtener nuevas coordenadas para un robot en una determinada direccion
function getNewCords(cords,direction){
  let newCords = [];
  switch (direction) {
    case "N":
      if(cords[1] === 0){
        return false;
      }
      newCords[0]  = cords[0]
      newCords[1]  = cords[1] - 1
      break;
    case "S":
      if(cords[1] == lado-1){
        return false;
      }
      newCords[0]  = cords[0]
      newCords[1]  = cords[1] + 1
      break;
    case "W":
      if(cords[0] === 0){
        return false;
      }
      newCords[0]  = cords[0] -1
      newCords[1]  = cords[1]
      break;
    case "E":
      if(cords[0] == lado-1){
        return false;
      }
      newCords[0]  = cords[0] +1
      newCords[1]  = cords[1]
      break;
  }
  if(!isEmptyCoord(newCords)){
    return false;
  }
  return newCords;
}

//Comprobar si la coordenada esta libre
function isEmptyCoord(coord){
  if(coord != undefined){
    if(map[coord[0]][coord[1]] === "."){
      return true;
    }
  }

  return false;
}

//Cambiar las coordenadas de un robot
function setRobotCoord(robot,oldCords,newCords){
  map[oldCords[0]][oldCords[1]] = "."
  map[newCords[0]][newCords[1]] = robot
}

//Buscar las coordenadas de un robot
function getRobotCoord(robot) {
    for(x = 0; x < lado; x++){
      for(y = 0; y < lado; y++){
        if(map[x][y] === robot){
          return [x,y]
        }
      }
    }
    return [0,0]
}

//Generar imagen
function render(){

  //Limpiar pantalla ¡¡Solo funciona en NodeJS!!
  process.stdout.write('\033c');

  //Dibujado marco superior
  let superior = "┏"
  if(ejes){
    superior = "   "+superior;
  }
  for(i = 0; i < lado*2; i++){
    superior = superior + "━"
  }
  superior= superior + "┓"
  console.log(superior);

  for(x = 0; x < lado; x++){
    let linea = "┃"
    if(ejes){
      let coord = x;
      //Añadir 0 delante de los numeros de solo una cifra
      if(x <= 9 ){
        coord = "0"+x
      }
      linea = coord + " " + linea;
    }
    for(y = 0; y < lado; y++){
      let hueco = map[x][y];
      if(robots.indexOf(hueco) != -1){
        linea = linea + " "+ hueco
      }else if(hueco === "*"){
        linea = linea  + " " +obstaculo
      }else{
        if(ejes){
          linea = linea + "[]"
        }else{
          linea = linea + "  "
        }
      }
    }
    linea = linea + "┃"
    console.log(linea)
  }

  //Dibujado marco inferior
  let inferior = "┗"
  if(ejes){
    //Añadimos un offset si dibujamos los ejes
    inferior = "   "+inferior;
  }
  for(i = 0; i < lado*2; i++){
    inferior = inferior + "━"
  }
  inferior= inferior + "┛"
  console.log(inferior);



  if(ejes){
    //Dibujamos el eje de Y en dos líneas
    let yline1 = "     ";
    let yline2 = "     ";

    for(i = 0; i < lado; i++){
      let aux = i;
      //Añadir 0 delante de los numeros de solo una cifra
      if(i <= 9 ){
        aux = "0"+i
      }
      aux = aux.toString();
      yline1 = yline1 + aux.charAt(0)+" ";
      yline2 = yline2 + aux.charAt(1)+" ";

    }
    console.log(yline1);
    console.log(yline2);

  }
}



/*
    Dibujamos en el plano
    A B C D E F... => Robots
    . => Libre
    * => Obstaculo
*/

// Robots
map[7][12] = "A"
map[12][41] = "B"
map[27][25] = "C"
map[39][39] = "D"
map[36][17] = "E"
map[33][21] = "F"
map[16][23] = "G"

//Logo IronHack
map[22][16] = "*"
map[18][16] = "*"
map[22][17] = "*"
map[21][17] = "*"
map[20][17] = "*"
map[19][17] = "*"
map[18][17] = "*"
map[22][18] = "*"
map[18][18] = "*"
map[22][20] = "*"
map[21][20] = "*"
map[20][20] = "*"
map[19][20] = "*"
map[18][20] = "*"
map[18][21] = "*"
map[21][21] = "*"
map[20][21] = "*"
map[20][22] = "*"
map[19][22] = "*"
map[18][22] = "*"
map[22][22] = "*"
map[22][24] = "*"
map[21][24] = "*"
map[20][24] = "*"
map[19][24] = "*"
map[18][24] = "*"
map[22][26] = "*"
map[21][26] = "*"
map[20][26] = "*"
map[19][26] = "*"
map[18][26] = "*"
map[22][25] = "*"
map[18][25] = "*"
map[22][28] = "*"
map[21][28] = "*"
map[20][28] = "*"
map[19][28] = "*"
map[18][28] = "*"
map[22][31] = "*"
map[21][31] = "*"
map[20][31] = "*"
map[19][31] = "*"
map[18][31] = "*"
map[19][29] = "*"
map[20][30] = "*"
map[25][16] = "*"
map[26][16] = "*"
map[27][16] = "*"
map[28][16] = "*"
map[29][16] = "*"
map[27][17] = "*"
map[25][18] = "*"
map[26][18] = "*"
map[27][18] = "*"
map[28][18] = "*"
map[29][18] = "*"
map[25][20] = "*"
map[26][20] = "*"
map[27][20] = "*"
map[28][20] = "*"
map[29][20] = "*"
map[25][21] = "*"
map[27][21] = "*"
map[25][22] = "*"
map[26][22] = "*"
map[27][22] = "*"
map[28][22] = "*"
map[29][22] = "*"
map[25][24] = "*"
map[26][24] = "*"
map[27][24] = "*"
map[28][24] = "*"
map[29][24] = "*"
map[25][25] = "*"
map[25][26] = "*"
map[29][25] = "*"
map[29][26] = "*"
map[25][28] = "*"
map[26][28] = "*"
map[27][28] = "*"
map[28][28] = "*"
map[29][28] = "*"
map[27][29] = "*"
map[26][30] = "*"
map[28][30] = "*"
map[25][31] = "*"
map[29][31] = "*"
map[31][33] = "*"
map[30][33] = "*"
map[29][33] = "*"
map[28][33] = "*"
map[27][33] = "*"
map[26][33] = "*"
map[25][33] = "*"
map[24][33] = "*"
map[23][33] = "*"
map[22][33] = "*"
map[21][33] = "*"
map[20][33] = "*"
map[19][33] = "*"
map[18][33] = "*"
map[17][33] = "*"
map[31][14] = "*"
map[30][14] = "*"
map[29][14] = "*"
map[28][14] = "*"
map[27][14] = "*"
map[26][14] = "*"
map[25][14] = "*"
map[24][14] = "*"
map[23][14] = "*"
map[22][14] = "*"
map[21][14] = "*"
map[20][14] = "*"
map[19][14] = "*"
map[18][14] = "*"
map[17][14] = "*"
map[32][32] = "*"
map[33][31] = "*"
map[34][30] = "*"
map[35][29] = "*"
map[36][28] = "*"
map[37][27] = "*"
map[38][26] = "*"
map[39][25] = "*"
map[32][15] = "*"
map[33][16] = "*"
map[34][17] = "*"
map[35][18] = "*"
map[36][19] = "*"
map[37][20] = "*"
map[38][21] = "*"
map[39][22] = "*"
map[16][15] = "*"
map[15][16] = "*"
map[14][17] = "*"
map[13][18] = "*"
map[12][19] = "*"
map[11][20] = "*"
map[10][21] = "*"
map[9][22] = "*"
map[16][32] = "*"
map[15][31] = "*"
map[14][30] = "*"
map[13][29] = "*"
map[12][28] = "*"
map[11][27] = "*"
map[10][26] = "*"
map[9][25] = "*"

/*
* Con moveRobots Iniciamos el programa
*/

moveRobots();
