let img;
let imgbkp;
//let url = "image/download.png";
let url = "image/palo2.jpg";
//let url = "image/paloEro.jpeg";
//let url = "image/palografico3.jpeg";
//let url = "image/shark.png";
//let url = "image/horse.png";
//let url = "image/aPalo.png";

let qtd = 0;

function preload() {
  //img = loadImage("image/paloEro.jpeg"); 
  img = loadImage(url); 
  imgbkp = loadImage(url);
}

function setup() {
  // create canvas
  createCanvas(img.width, img.height);
  console.log("w,h",width, height);
  img.loadPixels()
  imgbkp.loadPixels()
  background(255,10,10);
  
  noLoop();
  //pixelDensity(1)
  //image(img, img.width, 0);
  
}

function draw() {
  
  //image(imgbkp, 0, 0);
  //image(img, 0, 0);
  //image(img, 0, 0);

  //threshold(img,230);
  //inverter(img,230);

 

  //threshold(img,230);

 /*  let imgcp = createImage(img.width, img.height);
  imgcp.loadPixels();
  copyTo(img,imgcp); */


 
  //faz a esqueletização em texto e retorna o texto esqueletizado
  //skeletize(img);

  //console.log(imgT)



  //pegar a array de e jogar pra dentro do tinigh


  /* img.updatePixels();
  image(img, 0, 0); */

  //threshold(img,230);
  //skeletize(img);
 
  img.updatePixels();
  image(img, 0, 0);

}

/* Esse processo pega os pontos de maxima e minima dos traços 
  que estão em pMax e pMin
*/
function mouseClicked()
{
  stroke(255, 0, 0);
  point(mouseX, mouseY);
  
  //background(255);


  for (let i = 0; i < img.width; i++) {
    point(i, mouseY);
    if (isBlack(img,i,Math.floor(mouseY)))
    {
      // incrementa o contador
      qtd++;

      let hitPoint = {x: i, y: Math.floor(mouseY)};
      let currpoints = {x: i, y: Math.floor(mouseY)};
      //console.log(hitPoint);
      stroke(0, 255, 0);
      point(i, mouseY);
      stroke(255, 0);



      // navegar pra cima ate encontrar um branco e pegar o ponto de máxima.
      // pegar os 3 pontos de cima do pixel
      let c = 0;
      let tl = isBlack(img,currpoints.x-1,currpoints.y-1-c) // top-left
      let tc = isBlack(img,currpoints.x,currpoints.y-1-c) // top-center
      let tr = isBlack(img,currpoints.x+1,currpoints.y-1-c) // top-right

      while (tl || tc || tr)
      {
        c++;

        /* tranforma todos os bits em brancos, pra não contar novamente*/
        /* setColor(img,currpoints.x-1, currpoints.y-1-c,255);
        setColor(img,currpoints.x, currpoints.y-1-c,255);
        setColor(img,currpoints.x+1, currpoints.y-1-c,255); */
        


        if (tl && !tc && !tr)
        { 
          currpoints.x-=1;
        }
        else if (tr && !tc && !tl){
          currpoints.x+=1;
        }

        tl = isBlack(img,currpoints.x-1,currpoints.y-1-c) // top-left
        tc = isBlack(img,currpoints.x,currpoints.y-1-c) // top-center
        tr = isBlack(img,currpoints.x+1,currpoints.y-1-c) // top-right

        /* stroke(0, 255, 255);
        point(currpoints.x, currpoints.y-1-c); */

      }

      //console.log("PMax: ", currpoints.x, currpoints-1-c);

      stroke(2, 155, 255);
      point(currpoints.x, currpoints.y-1-c);

      let pMax = {x: currpoints.x, y: currpoints.y-1-c};


      //reseta o currpoints para fazer para baixo
      currpoints.x = hitPoint.x;
      currpoints.y = hitPoint.y;
       
      // navegar pra baixo ate encontrar um branco e pegar o ponto de máxima.
      // pegar os 3 pontos de baixo do pixel

      c = 0;
      let bl = isBlack(img,currpoints.x-1,currpoints.y+1+c) // top-left
      let bc = isBlack(img,currpoints.x,currpoints.y+1+c) // top-center
      let br = isBlack(img,currpoints.x+1,currpoints.y+1+c) // top-right

      while (bl || bc || br)
      { 
        c--;


        if (bl && !bc && !br)
        { 
          currpoints.x-=1;
        }
        else if (br && !bc && !bl){
          currpoints.x+=1;
        }

        bl = isBlack(img,currpoints.x-1,currpoints.y-1-c) // top-left
        bc = isBlack(img,currpoints.x,currpoints.y-1-c) // top-center
        br = isBlack(img,currpoints.x+1,currpoints.y-1-c) // top-right

        /* stroke(0, 255, 255);
        point(currpoints.x, currpoints.y-1-c); */

      }

      //console.log("PMin: ", currpoints.x, currpoints-1-c);

      stroke(2, 155, 255);
      point(currpoints.x, currpoints.y-1-c);

      let pMin = {x: currpoints.x, y: currpoints.y-1-c};

      //console.log(pMin, pMax);

      // O codigo abaixo faz uma interpolação linear entra os pontos
      stroke(100,25,70);
      line(pMin.x, pMin.y, pMax.x, pMax.y);

      textSize(5)
      stroke(0);
      strokeWeight(.5)
      text(qtd, pMax.x, pMax.y-5);
    }
  }

  console.log("Total: ", qtd);
}
