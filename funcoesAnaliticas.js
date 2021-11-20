/** 
 *  Conta quantos palitos a partir de uma determinado ponto y.
 *  e retorna uma array dos palitos naquela posição.
 * Ao realizar essa contagem os palitos computados são apagados da imagem original para não ter 
 * duplicidade na contagem.
 * @param img P5Image
 * @param y coordernada de y
 * @return 
*/
function contarPalitos(img, y)
{
  let palitos = [];

  //stroke(0, 0, 255);
  let prevMouseY = Math.floor(y);

  //point(mouseX, prevMouseY);
  //background(255);

  for (let i = 0; i < img.width; i++) {
    // stroke(255, 0, 0);
    
    // point(i, mouseY);
    if (isBlack(img,i,prevMouseY))
    {
      /* 
        incrementa o contador se não tiver ninguem ao lado, como essa valor 
        vai se deslocar para direita fazendo i+1 && i-1 ele vai desconsiderar
        os traços que tem eventualmente algum pixel preto lateral.
        Sabendo que isso ocorrerá no máximo 2 vezes eu posso escolher qualquer lado
        para restringir. Assim em vez de contar em duplicidade, vai contar apenas uma
        vez. Nesse caso escolhi o lado direito i+1
      */
      if (!isBlack(img,i+1,prevMouseY))
        qtd++;

      //salva a posição do hitPoint
      let hitPoint = {x: i, y: prevMouseY};

      // clone do hitPoint para manipulação
      let currpoints = {x: i, y: prevMouseY};

      //desenha o local do hitPoint
     /*  stroke(0, 150, 0);
      fill(0, 255, 0);
      ellipse(i, prevMouseY,2); */



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
        setColor(img, currpoints.x, currpoints.y-c, 255);
        setColor(img, currpoints.x-1, currpoints.y-c, 255);
        setColor(img, currpoints.x+1, currpoints.y-c, 255);
        
        

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

     /*  stroke(2, 155, 255);
      point(currpoints.x, currpoints.y-1-c); */

      let pMax = {x: currpoints.x, y: currpoints.y-1-c};


      //reseta o currpoints para fazer para baixo
      currpoints.x = hitPoint.x;
      currpoints.y = hitPoint.y;

      setColor(img, currpoints.x, currpoints.y, 0);
       
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

        /* tranforma todos os bits em brancos, pra não contar novamente*/
        setColor(img, currpoints.x, currpoints.y -1-c, 255);
        setColor(img, currpoints.x-1, currpoints.y-1-c, 255);
        setColor(img, currpoints.x+1, currpoints.y-1-c, 255);

        /* stroke(0, 255, 255);
        point(currpoints.x, currpoints.y-1-c); */

      }

      /* stroke(2, 155, 255);
      point(currpoints.x, currpoints.y-1-c); */

      let pMin = {x: currpoints.x, y: currpoints.y-1-c};

      /* // O codigo abaixo faz uma interpolação linear entra os pontos
      stroke(100,25,70);
      line(pMin.x, pMin.y, pMax.x, pMax.y);

      // O codigo abaixo faz uma desenha uma linha no pMax e pMin.
      stroke(100,25,70);
      line(pMin.x-5, pMin.y, pMin.x+5, pMin.y);
      line(pMax.x-5, pMax.y, pMax.x+5, pMax.y);


      //escrever o texto
      fill(0);
      textSize(5)
      stroke(0);
      strokeWeight(.5)
      text(qtd, pMax.x, pMax.y-5); */

      /* Tenho a disposição agora o pMax, pMin e hitPoint caso queira salvá-los */

      palitos.push({pMax, pMin, hitPoint})
    }
  }

  //console.log("Total: ", qtd);
  return palitos;
}

/** 
 * Conta quantos palitos a partir de uma determinado ponto y.
 * e retorna uma array dos palitos naquela posição.
 * Ao realizar essa contagem os palitos computados são apagados da imagem original para não ter 
 * duplicidade na contagem. Realiza os desenhos na tela para debug
 * @param img P5Image
 * @param y coordernada de y
 * @return 
*/
function contarPalitosDebug(img, y)
{
  let palitos = [];

  stroke(0, 0, 255);
  let prevMouseY = Math.floor(y);

  //point(mouseX, prevMouseY);
  //background(255);

  for (let i = 0; i < img.width; i++) {
    // stroke(255, 0, 0);
    
    point(i, prevMouseY);
    if (isBlack(img,i,prevMouseY))
    {
      /* 
        incrementa o contador se não tiver ninguem ao lado, como essa valor 
        vai se deslocar para direita fazendo i+1 && i-1 ele vai desconsiderar
        os traços que tem eventualmente algum pixel preto lateral.
        Sabendo que isso ocorrerá no máximo 2 vezes eu posso escolher qualquer lado
        para restringir. Assim em vez de contar em duplicidade, vai contar apenas uma
        vez. Nesse caso escolhi o lado direito i+1
      */
      if (!isBlack(img,i+1,prevMouseY))
        qtd++;

      //salva a posição do hitPoint
      let hitPoint = {x: i, y: prevMouseY};

      // clone do hitPoint para manipulação
      let currpoints = {x: i, y: prevMouseY};

      //desenha o local do hitPoint
      stroke(0, 150, 0);
      fill(0, 255, 0);
      ellipse(i, prevMouseY,2);



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
        setColor(img, currpoints.x, currpoints.y-c, 255);
        setColor(img, currpoints.x-1, currpoints.y-c, 255);
        setColor(img, currpoints.x+1, currpoints.y-c, 255);
        
        

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

      setColor(img, currpoints.x, currpoints.y, 0);
       
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

        /* tranforma todos os bits em brancos, pra não contar novamente*/
        setColor(img, currpoints.x, currpoints.y -1-c, 255);
        setColor(img, currpoints.x-1, currpoints.y-1-c, 255);
        setColor(img, currpoints.x+1, currpoints.y-1-c, 255);

        /* stroke(0, 255, 255);
        point(currpoints.x, currpoints.y-1-c); */

      }

      stroke(2, 155, 255);
      point(currpoints.x, currpoints.y-1-c);

      let pMin = {x: currpoints.x, y: currpoints.y-1-c};

      // O codigo abaixo faz uma interpolação linear entra os pontos
      stroke(100,25,70);
      line(pMin.x, pMin.y, pMax.x, pMax.y);

      // O codigo abaixo faz uma desenha uma linha no pMax e pMin.
      stroke(100,25,70);
      line(pMin.x-5, pMin.y, pMin.x+5, pMin.y);
      line(pMax.x-5, pMax.y, pMax.x+5, pMax.y);


      //escrever o texto
      fill(0);
      textSize(5)
      stroke(0);
      strokeWeight(.5)
      text(qtd, pMax.x, pMax.y-5);

      /* Tenho a disposição agora o pMax, pMin e hitPoint caso queira salvá-los */

      palitos.push({pMax, pMin, hitPoint})
    }
  }

  //console.log("Total: ", qtd);
  return palitos;
}


/**
 * Conta todos os palitos de uma imagem.
 * Retorna uma array unidimensioal com os dados dos palitos.
 * @param img P5Image 
 * @returns {array}
 */
function contarTodosPalitos(img)
{
  let palitos = [];
  for (let y = 0; y < img.height; y++) {
    let r = contarPalitosDebug(img, y);
    if (r.length > 0)
      palitos.push(...r);
  }

  return palitos;
}

/**
 * Conta todos os palitos de uma imagem.
 * Retorna uma array unidimensioal com os dados dos palitos. Realiza os desenhos na tela para debug
 * @param img P5Image 
 * @returns {array}
 */
function contarTodosPalitosDebug(img)
{
  let palitos = [];
  for (let y = 0; y < img.height; y++) {
    let r = contarPalitosDebug(img, y);
    if (r.length > 0)
      palitos.push(...r);
  }

  return palitos;
}

/**
 * Função que verifica há algum palito abaixo do y dado na array de palitos.
 * Serve para separar os palitos em grupos horizontais diferentes.
 * @param {array} arrPalitos array 1d de palitos
 * @param {number} y 
 * @returns 
 */
function haPalitosComPminMaiorQueEssaLinha(arrPalitos, y)
{
 for (const palito of arrPalitos) {
    if (palito.pMin.y > y)
    { 
      return true;
    }
 }
 return false;
}

/**
 * Retorna uma array binimensional com os palitos separadors por grupos horizontais.
 * 'separadors por linhas'
 * 
 * @param img P5Image 
 * @returns {array} palitosrow
 */
 function contarTodosPalitosSeparandoPorLinhas(img)
 {
   let palitos = [];
   let palitosrow = [];
 
   let vezesSemNenhum = 0;
   let row = 0;
 
   palitosrow[row] = [];
 
   for (let y = 0; y < img.height; y++) {
     let r = contarPalitos(img, y);
     if (r.length > 0)
     {
       vezesSemNenhum = 0;
       palitos.push(...r);
       palitosrow[row].push(...r);
     }
     else
     {
       vezesSemNenhum++
     }
     
     // 3 linhas sem nenhum palito
     if (vezesSemNenhum > 3 && !haPalitosComPminMaiorQueEssaLinha(palitos,y))
     {
       row++;
       palitosrow[row] = [];
       vezesSemNenhum = 0;
     }
   }
 
   // pegar as row e retirar as vazias
   palitosrow = palitosrow.filter((r)=>r.length>0)
   return palitosrow;
}


/**
 * Retorna uma array binimensional com os palitos separadors por grupos horizontais.
 * 'separadors por linhas'
 * Debug
 * @param img P5Image 
 * @returns {array} palitosrow
 */
function contarTodosPalitosSeparandoPorLinhasDebug(img)
{
  let palitos = [];
  let palitosrow = [];

  let vezesSemNenhum = 0;
  let row = 0;

  palitosrow[row] = [];

  for (let y = 0; y < img.height; y++) {
    let r = contarPalitosDebug(img, y);
    if (r.length > 0)
    {
      vezesSemNenhum = 0;
      palitos.push(...r);
      palitosrow[row].push(...r);
    }
    else
    {
      vezesSemNenhum++
    }
    
    // 3 linhas sem nenhum palito
    if (vezesSemNenhum > 3 && !haPalitosComPminMaiorQueEssaLinha(palitos,y))
    {
      row++;
      palitosrow[row] = [];
      console.log('3 vezes');
      stroke(24,76,95)
      line(0,y, img.width,y);
      vezesSemNenhum = 0;
    }
  }

  // pegar as row e retirar as vazias
  palitosrow = palitosrow.filter((r)=>r.length>0)
  console.log(palitosrow);
  return palitos;
}


/**
 * Pega uma palitosrow e retorna uma array unidimensional com todos os palitos;
 * @param {array} palitosrow 
 * @returns {array}
 */ 
function palitosRowTo1dPalitos(palitosrow)
{ 
    let palitos = []
    for (let rowPalitos of palitosrow) {
        palitos.push(...rowPalitos);
    }

    return palitos;
}

/**
 *  Desenha na tela todos os palitos com os dados recebidos.
 * @param {array} arrPalitos Array unidimensional de palitos.
 */
 function recriarFolhaDePalitos(arrPalitos)
 {
   for (let palito of arrPalitos) {
     // O codigo abaixo faz uma interpolação linear entra os pontos
     stroke(100,25,70);
     line(palito.pMin.x, palito.pMin.y, palito.pMax.x, palito.pMax.y);
 
     // O codigo abaixo faz uma desenha uma linha no palito.pMax e palito.pMin.
     stroke(100,25,70);
     line(palito.pMin.x-3, palito.pMin.y, palito.pMin.x+3, palito.pMin.y);
     line(palito.pMax.x-3, palito.pMax.y, palito.pMax.x+3, palito.pMax.y);
   }
}

/**
 *  Desenha na tela todos os palitos com os dados recebidos.
 *  E acrescenta o numero deles fazendo ordenação de cima para baixo, 
 *  da esquerda pra direita.
 * @param {array} palitosrow 
 */
 function recriarFolhaDePalitosComRowsEContagem(palitosrow)
 {
   let myQtd = 0;
   textSize(5);
   
   for (let palitos of palitosrow) {
  
     //console.log(palitos);
     /* ordena as rows da direita pra esquerda */
     palitos.sort((a,b)=>{return a.pMin.x - b.pMin.x});
     
     for (const palito of palitos) {
       myQtd++;
       // O codigo abaixo faz uma interpolação linear entra os pontos
       stroke(100,25,70);
       line(palito.pMin.x, palito.pMin.y, palito.pMax.x, palito.pMax.y);
 
       // O codigo abaixo faz uma desenha uma linha no palito.pMax e palito.pMin.
       stroke(100,25,70);
       line(palito.pMin.x-3, palito.pMin.y, palito.pMin.x+3, palito.pMin.y);
       line(palito.pMax.x-3, palito.pMax.y, palito.pMax.x+3, palito.pMax.y);
 
       //escrever o texto
       fill(0);
       stroke(0);
       strokeWeight(.5)
       text(myQtd, palito.pMax.x, palito.pMax.y-5);
     }
   }
 
   
}


/**
 *  Filtra a array de entrada deixando apenas palitos com comprimento maior que 3 pixels
 * @param {array} arrPalitos  array com os pontos dos plalitos
 * @returns {array} 
 */
 function filterHorizontalPalitos(arrPalitos)
 { 
   return arrPalitos.filter((p)=>{
     return p.pMin.y - p.pMax.y > 3
   })
 }

 /**
 *  Filtra a array de entrada deixando apenas palitos com comprimento menor que 3 pixels
 * @param {array} arrPalitos  array com os pontos dos plalitos
 * @returns {array} 
 */
function filterVerticalPalitos(arrPalitos)
{ 
  return arrPalitos.filter((p)=>{
    return p.pMin.y - p.pMax.y <= 3
  })
}