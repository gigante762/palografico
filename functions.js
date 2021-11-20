/**
 * Passa pela imagem atribuindo aos pixels os retorno da função de callback
 * @param img P5image
 * @param {function} callback (r,g,b,a)=>[r,g,b,a]
 */
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

/**
 * Espelha a imagem na horizontal
 * @param img P5image
 */
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

/**
 * Espelha a imagem na horizontal
 * @param img P5image
 */
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


/**
 * Recebe uma imagem binária e retorna uma array 2d
 * textual onde o branco é ' ' e preto '#'.
 * Usada para intermediar o processo de esqueletização.
 * @param  img P5image
 * @returns {array}
 */
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

/**
 * Recebe uma array 2d textual onde o branco é ' ' e preto '#'.
 * E recria uma imagem com base nessa array de texto binária. 
 * Dando preto a '#' e branco a vazio ' '.
 * Esperá-se que que as duas arrays, gridTexto e img sejam do mesmo tamanho.
 * Usada para intermediar o processo de esqueletização.
 * @param  img P5image
 * @param  {array} gridTexto array2d de  ' '  '#'.
 */
function put2DgridTextoIntoImage(gridTexto, img)
{
  for (let i = 0; i < gridTexto.length; i++) {
    for (let j = 0; j < gridTexto[i].length; j++) {
      let c = (gridTexto[i][j] === ' ') ? 255 : 0;
      setColor(img,j,i,c)
    }
  }
}

/**
 * retorna um objeto com os palitos e o tamanho da folha para análise.
 * @returns 
 */
function exportPalitosData()
{ 
  return {
    paper: {widht: img.width, height: img.height},
    palitos
  }
}
