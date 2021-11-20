/**
 *  Retorna uma array com as cores de uma determinado ponto
 * @param img P5image
 * @param {number} x 
 * @param {number} y 
 * @returns {array} [r,g,b,a];
 */
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
 *  Retorna o valor do primeiro canal (red). 
 *  Função criada pra usar em imagens binárias e substituir a sintaxe 
 *  'getColor(img, x, y)[0]'
 * @param img P5image
 * @param {number} x 
 * @param {number} y 
 * @returns {number} color range (0-255);
 */
 function getBColor(img, x, y)
 {
  let off = (y * img.width + x) * 1 * 4;
  return img.pixels[off];
}


/**
 * Aplica uma cor em um determinado ponto.
 * @param img P5image
 * @param {number} x 
 * @param {number} y 
 * @param color [r,g,b,a] | number
 */
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
        setColor(to, x, y, getColor(from,x,y));
    }
  }
}

 /**
 * @param img P5image
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
function isBlack(img,x,y)
{
  return getBColor(img,x,y) === 0;
}
 