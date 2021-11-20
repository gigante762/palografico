let img;
let imgbkp;
//let url = "image/download.png";
//let url = "image/palo.jpg";
//let url = "image/palo2.jpg";
let url = "image/palo3.jpeg";
//let url = "image/paloEro.jpeg";
//let url = "image/palografico3.jpeg";
//let url = "image/palografico4.jpeg";
//let url = "image/shark.png";
//let url = "image/horse.png";
//let url = "image/aPalo.png";
//let url = "image/lena.png";
//let url = "image/tree_salt.png";


/* Do not touch */
let palitos = [];
let palitosrows = [];
let qtd = 0;
/* -------- */




function preload() {
  //img = loadImage("image/paloEro.jpeg"); 
  img = loadImage(url); 
  imgbkp = loadImage(url);
}

function setup() {
  // create canvas
  createCanvas(img.width, img.height);
  //console.log("w,h",width, height);
  img.loadPixels()
  imgbkp.loadPixels()
  background(255);
  
  noLoop();

  //frameRate(30)
  
  /* thresholdOtsu(img);
  skeletize(img);
  palitos = contarTodosPalitos(img);
  palitos = filterHorizontalPalitos(palitos);
  console.log(palitos.length);
  palitos.sort((a,b)=>{return a.pMin.y - b.pMin.y});

  background(255);

  img.updatePixels();
  image(img, 0, 0); */
  
  
}

function draw()
{

  /* thresholdOtsu(img);
  skeletize(img);
  simulateDilatarCruz(img);
  erodirCruz(img);
  skeletize(img); */

  //palitosrows = contarTodosPalitosSeparandoPorLinhas(img);
  //palitos = palitosRowTo1dPalitos(palitosrows);

  //console.log("palitosrow: ", palitosrows);
  //console.log("palitos: ", palitos);
  //recriarFolhaDePalitosComRowsEContagem(palitosrows);

  //otsu(img);
  //skeletize(img);
 
  img.updatePixels();
  
  //gray(img);
  //salt(img, 900);
 

  //image(img, 0, 0);
}

/* Esse processo pega os pontos de maxima e minima dos traços 
  que estão em pMax e pMin
*/
function mouseClicked()
{

  //console.log(get(mouseX, mouseY));
  //let palitos = [];
  //palitos = contarTodosPalitos(img);

  //contarPalitosDebug(img, mouseY);

}
