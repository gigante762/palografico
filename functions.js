function getColor(img, x, y)
{
  //let d = pixelDensity();
  let off = (y * img.width + x) * 1 * 4;
  let c = [];
  c.push(img.pixels[off]);
  c.push(img.pixels[off + 1]);
  c.push(img.pixels[off + 2]);
  c.push(img.pixels[off + 3]);
  
  return c;
}
/**
 *  Copia os pixels de uma imagem para outras
 *  @param from P5Image
 *  @param to P5Image
 * 
 * */
function copyTo(from, to)
{
  for (let y = 0; y < from.height; y++) {
    for (let x = 0; x < from.width; x++) {

        setColor(to, x, y, getColor(from,x,y))
    }
  }
}


function mapPixels(img, callback)
{
  for (let i = 0; i < img.pixels.length; i+=4) {

    let r = callback(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]);

    img.pixels[i] = r[0]
    img.pixels[i + 1] = r[1]
    img.pixels[i + 2]= r[2]
    img.pixels[i + 3] = r[3]
  }
}


function setColor(img, x, y, color)
{
  //let d = pixelDensity();
  let off = (y * img.width + x)  *1* 4;

  if (!Array.isArray(color))
  {
    img.pixels[off] = color;
    img.pixels[off + 1] = color;
    img.pixels[off + 2] = color;
    img.pixels[off + 3] = 255;
  }
  else
  {
    img.pixels[off] = color[0];
    img.pixels[off + 1] = color[1];
    img.pixels[off + 2] = color[2];
    img.pixels[off + 3] = color[3];
  }
  
}

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

/* Destaca de vermelhos os grays abaixo do limiar */
function verme(img, limiar= 128)
{
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
        let c = getColor(img,x,y)
        let gray = (c[0] + c[1] + c[2])/3

        if (gray < limiar )
        {
          setColor(img,x,y,[255,0,0,255])
        }
    }
  }
  img.updatePixels()
}

/* Converte pra preto e branco de acordo com o limiar */
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

function giveMediaLimiar(img)
{

  let soma = 0
  let n = 0
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
        let c = getColor(img,x,y)
        let gray = (c[0] + c[1] + c[2])/3

        soma += gray;
        n++;
    }
  }

  return soma/n
}

function giveMedianaLimiar(img)
{

  let tons = new Set()
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
        let c = getColor(img,x,y)
        let gray = (c[0] + c[1] + c[2])/3
        tons.add(gray)
    }
  }

  let arr = Array.from(tons)
  arr.sort((a,b)=>a-b)
  //console.table(arr);
  return arr[(Math.floor(arr.length/2))]
}

function tryRemoveSinglePixel(){
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
        //let gray = img.get(i,400,color(255,0,0))
        let up = img.get(x,y-1)
        let down = img.get(x,y+1)
        if (up[0] == 255 && down[0] == 255)
        {
          img.set(x,y,color(255,255,255))
        }
    }
  }
  img.updatePixels()
}

function mirrorH(img)
{
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width/2; x++) {
        //let gray = img.get(i,400,color(255,0,0))
        let l = getColor(img,x,y)
        let r = getColor(img,img.width-x,y)
       
        setColor(img,x,y,r)
        setColor(img,img.width-x,y,l)


    }
  }
  img.updatePixels()
}

function mirrorV(img)
{
  for (let y = 0; y < img.height/2; y++) {
    for (let x = 0; x < img.width; x++) {
        //let gray = img.get(i,400,color(255,0,0))
        let l = getColor(img,x,y)
        let r = getColor(img,x,img.height-y)

       setColor(img,x,y,r)
       setColor(img,x,img.height-y,l)
    }
  }
  img.updatePixels()
}

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

function checkDilatarHorizontal(img, posX, posY)
{

    /*  cada variavel vai devolver 0 ou 255 | false ou true */
    let center =getColor(img,posX,posY)[0]? true : false;
    let left =getColor(img,posX-1,posY)[0] ? true : false;
    let right =getColor(img,posX+1,posY-1)[0]? true : false;


    return center  || left || right;
}

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

function dilatarCruz(img)
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

function simulateDilatarCruz(img)
{
    /* Inverte a imagem aplica o erodeCruz e inverte */
    inverter(img)
    erodirCruz(img)
    inverter(img)

}

function simulateDilatarHorizontal(img)
{
    /* Inverte a imagem aplica o erodeCruz e inverte */
    inverter(img)
    erodirHorizontal(img)
    inverter(img)

}

function simulateDilatarVertical(img)
{
  /* Inverte a imagem aplica o erodeCruz e inverte */
  inverter(img)
  erodirVertical(img)
  inverter(img)

}

function findTopPixel(img, startX, startY)
{

    let cX = startX; // current x
    let cY = startY; // current y
    stroke(255,0,0);
    /* Vai subindo em y até encontra o branco e colocando em vermelho */

    let go = true;
    while ( go && cY > 0 ){
        //img.set(img,cX,cY-1,color(255,0,0))
        let c = getColor(img,cX,cY);
        //console.log(c);
        go = c[0] ? false : true;
        //console.log('p: ',cX, cY, c[0], go);
        point(cX,cY)
        cY--;
    }
    
    img.updatePixels()

    stroke(255,0,0);
    //line(startX,startY,cX,cY);
    return [cX,cY];
}


function gambiarraImgBinariaPara2dgrid(img)
{
  let arr = [];
  for (let y = 0; y < img.height; y++) {
    arr[y] = [];
    for (let x = 0; x < img.width; x++) {
     arr[y][x] = getColor(img,x,y)[0] ? ' ' : '#';
    }
  }

  return arr;
}

function gambiarraImgBinariaParaTexto(img)
{
  let div = document.createElement('pre')
  let arr = [];
  for (let y = 0; y < img.height; y++) {
    arr[y] = [];
    //let ele = document.createElement('p');
    for (let x = 0; x < img.width; x++) {
     let t =  getColor(img,x,y)[0] ? ' ' : '#';
     div.innerHTML += t;
     arr[y][x] = t;
    }
    //div.appendChild(ele);
    div.innerHTML += '\n'
  }

  //console.table(arr);

 /*  div.innerText = div.innerText.replaceAll('1',' ');
  div.innerText = div.innerText.replaceAll('0','#'); */
  //console.log(div.innerText);
  return div.innerText;
}

function gambiarraImgBinariaParaTextoHtml(img)
{
  let div = document.createElement('pre')
  let arr = [];
  for (let y = 0; y < img.height; y++) {
    arr[y] = [];
    //let ele = document.createElement('p');
    for (let x = 0; x < img.width; x++) {
     let t =  getColor(img,x,y)[0] ? ' ' : '#';
     div.innerHTML += t;
     arr[y][x] = t;
    }
    //div.appendChild(ele);
    div.innerHTML += '\n'
  }

  //console.table(arr);

 
  //console.log(div.innerText);
  document.body.appendChild(div);
}

function put2DgridTextoIntoImage(gridTexto, img)
{
  for (let i = 0; i < gridTexto.length; i++) {
    for (let j = 0; j < gridTexto[i].length; j++) {
      let c = (gridTexto[i][j] === ' ') ? 255 : 0;
      setColor(img,j,i,c)
    }
  }
}

function skeletize(img)
{
  let imgT = ZhangSuen().processGrid(gambiarraImgBinariaPara2dgrid(img));
  put2DgridTextoIntoImage(imgT,img)
  img.updatePixels();
}

function isBlack(img,x,y)
{
  return getColor(img,x,y)[0] === 0;
}