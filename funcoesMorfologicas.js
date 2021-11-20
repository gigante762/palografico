/**
 * Aplica um efeito grayscale na imagem.
 * @param img P5image
 */
function gray(img)
{
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {

        let c = getColor(img,x,y);
        let gray = (c[0] + c[1] + c[2])/3;
        setColor(img, x, y, [gray,gray,gray,c[3]])
    }
  }
  img.updatePixels()
}

/**
 * Aplica um efeito grayscale voltado para humanos na imagem.
 * @param img P5image
 */
function grayHuman(img)
{
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
        //let gray = img.get(i,400,color(255,0,0))
        let c = getColor(img,x,y)
        let GRAY = c[0]*0.3 + c[1]*0.59 + c[2]*0.11
        //let gray = (c[0] + c[1] + c[2])/3
        setColor(img, x, y, [GRAY,GRAY,GRAY,c[3]]);
    }
  }
  img.updatePixels()
}

/**
 * Destaca de vermelhos os pixels abaixo do limiar. 
 * A imagem precisa estar em grayscale ou binária.
 * @param img P5image
 * @param {number} limiar
 */
function verme(img, limiar = 128)
{
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
        let c = getColor(img,x,y)[0]
        if (c < limiar )
        {
          setColor(img,x,y,[255,0,0,255])
        }
    }
  }
  img.updatePixels()
}

/**
 * Converte pra preto (0) e branco (255) de acordo com o limiar.
 * @param img P5image
 * @param {number} limiar 
 */
function threshold(img, limiar=128)
{
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
        let c = getColor(img,x,y)
        let gray = (c[0] + c[1] + c[2])/3

        if ( gray < limiar )
        {
          setColor(img,x,y,0)
        }
        else
        {
          setColor(img,x,y,255)
          
        }
    }
  }
  img.updatePixels()
}

/**
 *  Verifica se vai dilatar em forma de cruz.
 *  Retorna true se algum (or) ponto da cruz for branco
 * @param img P5image
 * @param {number} posX 
 * @param {number} posY 
 * @return 
 */
 function checkDilatarCruz(img, posX, posY)
 {
   /*  cada variavel vai devolver 0 ou 255 | false ou true */
   let center =getColor(img,posX,posY)[0]? true : false;
   let top =getColor(img,posX,posY-1)[0]? true : false;
   let bottom =getColor(img,posX,posY+1)[0]? true : false;
   let left =getColor(img,posX-1,posY)[0]? true : false;
   let right =getColor(img,posX+1,posY-1)[0]? true : false;
 
 
   return center || top || bottom || left || right;
}

/**
 *  Verifica se vai dilatar em forma horizontal.
 * @param img P5image
 * @param {number} posX 
 * @param {number} posY 
 * @return 
 */
function checkDilatarHorizontal(img, posX, posY)
{

    /*  cada variavel vai devolver 0 ou 255 | false ou true */
    let center =getColor(img,posX,posY)[0]? true : false;
    let left =getColor(img,posX-1,posY)[0] ? true : false;
    let right =getColor(img,posX+1,posY-1)[0]? true : false;


    return center  || left || right;
}

/**
 *  Verifica se vai dilatar em forma vertical.
 * @param img P5image
 * @param {number} posX 
 * @param {number} posY 
 * @return 
 */
function checkDilatarVertical(img, posX, posY)
{

  /*  cada variavel vai devolver 0 ou 255 | false ou true */
  /* let center = img.get(posX,posY)[0] ? true : false;
  let top = img.get(posX,posY-1)[0] ? true : false;
  let bottom = img.get(posX,posY+1)[0] ? true : false; */
 
  let center = getColor(img,posX,posY)[0] ? true : false;
  let top = getColor(img,posX,posY-1)[0] ? true : false;
  let bottom = getColor(img,posX,posY+1)[0] ? true : false;


  return center || top || bottom;
}

/**
 *  Dilata a imagem em forma de cruz.
 * @param img P5image 
 */
function dilatarCruz(img)
{
  let imgcp = createImage(img.width, img.height);
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
    
            if (checkDilatarCruz(img, x, y))
            {
              setColor(imgcp,x,y,255)
             
            }
        }
    }
    copyTo(imgcp,img);
    img.updatePixels()
}

/**
 *  Erodir a imagem em forma de cruz.
 * @param img P5image 
 */
function erodirCruz(img)
{
    let imgcp = createImage(img.width, img.height);
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
    
            if (checkDilatarCruz(img, x, y))
            {
              setColor(imgcp,x,y,255)
              //img.set(x,y,color(255,255,255))
            }
            else
            {
              //img.set(x,y,color(255,255,255))
              //img.set(x,y,color(255,255,255))
              //img.set(x,y,color(0,0,0))
            }
        }
    }
    copyTo(imgcp,img);
    img.updatePixels()
}

/**
 *  Erodir a imagem em forma de vertical.
 * @param img P5image 
 */
function erodirVertical(img)
{

  let imgcp = createImage(img.width, img.height);

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      if (checkDilatarVertical(img, x, y))
      {
        setColor(imgcp,x,y,255);
      }
    }
  }

  copyTo(imgcp,img);
  img.updatePixels()
}

/**
 *  Erodir a imagem em forma de horizontal.
 * @param img P5image 
 */
function erodirHorizontal(img)
{
    let imgcp = createImage(img.width, img.height);
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
    
            if (checkDilatarHorizontal(img, x, y))
            {
              setColor(imgcp,x,y,255)
              //img.set(x,y,color(255,255,255))
            }
            else
            {
              //img.set(x,y,color(255,255,255))
              //img.set(x,y,color(255,255,255))
              //img.set(x,y,color(0,0,0))
            }
        }
    }
    copyTo(imgcp,img);
    img.updatePixels()
}

/**
 * Troca pixels pretos pro brancos e vice-versa
 * @param img P5image 
 */
function inverter(img)
{
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
           
            let c = getColor(img,x,y)[0]
            if (c)
            {
              setColor(img,x,y,0)
            }else{
              setColor(img,x,y,255)
            }
    
        }
      }
      img.updatePixels()
}

/**
 *  Dilata a imagem em forma de cruz. 
 *  Aplica em inverter, erodirCruz e inverter.
 * @param img P5image 
 */
function simulateDilatarCruz(img)
{
    /* Inverte a imagem aplica o erodeCruz e inverte */
    inverter(img)
    erodirCruz(img)
    inverter(img)
}

/**
 *  Dilata a imagem em forma horizontal. 
 *  Aplica em inverter, erodirHorizontal e inverter.
 * @param img P5image 
 */
function simulateDilatarHorizontal(img)
{
    /* Inverte a imagem aplica o erodeCruz e inverte */
    inverter(img)
    erodirHorizontal(img)
    inverter(img)
}

/**
 *  Dilata a imagem em forma vertical. 
 *  Aplica em inverter, erodirVertical e inverter.
 * @param img P5image 
 */
function simulateDilatarVertical(img)
{
  /* Inverte a imagem aplica o erodeCruz e inverte */
  inverter(img)
  erodirVertical(img)
  inverter(img)

}

/**
 * Realiza o processo de esqueletização da imagem.
 * @param img P5image
 */
 function skeletize(img)
 {
   let imgT = ZhangSuen().processGrid(gambiarraImgBinariaPara2dgrid(img));
   put2DgridTextoIntoImage(imgT,img)
   img.updatePixels();
 }

/**
 * Aplica um ruido de sal na imagem.
 * @param img P5image
 * @param qtd
 */
function salt(img, qtd = 100)
{ 
  for (let i = 0; i < qtd; i++) {
    let x = Math.floor(Math.random() * img.width) + 0;
    let y = Math.floor(Math.random() * img.height) + 0;
    setColor(img,x,y,255);
  }

  img.updatePixels();
}

/**
 * Aplica um filtro de mediana3x3  na imagem.
 * @param img P5image
 */
function mediana3x3(img)
{
  let imgcp = createImage(img.width, img.height);
  copyTo(img,imgcp);
  // aplicar em outra cópiar da imagem
  for (let iy = 0; iy < img.height; iy++) {
    for (let ix = 0; ix < img.width; ix++) {
      let arr = [];
      for (let y = -1; y < 2; y++) {
        for (let x = -1; x < 2; x++) {
          let v = getBColor(imgcp,ix+x,iy+y)
          if(v != undefined)
          { 
            arr.push(v);
          }
        }
      }
      //console.log(arr);
      arr.sort((a,b)=>a-b)
    
      setColor(imgcp,ix,iy, arr[Math.floor(arr.length/2)])
    }
  }
  copyTo(imgcp,img);
  img.updatePixels();
}

/**
 * Aplica threshold usando otsu na imagem. A imagem não precisar estar em grayscale.
 * A função faz o grayscale.
 * @param img P5image
 */
function thresholdOtsu(img)
{ 
  let arr = [];

    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let c = getColor(img, x,y);
            arr.push((Math.floor((c[0]+c[1]+c[2])/3)));
        }
    }

  let r = otsu(arr);
  threshold(img,r)
}