var palavras = [
  'DESAFIO',
  'JAVASCRIPT',
  'FORCA',
  'ALURA',
  'ORACLE',
  'CSS',
  'HTML',
]

var telaInicial = document.querySelector('.telaInicial')
var telaAdicionar = document.querySelector('.telaAdicionar')
var telaJogo = document.querySelector('.telaJogo')

var btComecar = document.querySelector('.btComecar')
btComecar.addEventListener('click', function () {
  telaInicial.classList.add('oculto')
  telaJogo.classList.remove('oculto')
  novoJogo()
})

var btAdicionar = document.querySelector('.btAdicionar')
btAdicionar.addEventListener('click', function () {
  telaInicial.classList.add('oculto')
  telaAdicionar.classList.remove('oculto')
})

var btSalvar = document.querySelector('.btSalvar')
btSalvar.addEventListener('click', function () {
  adicionarPalavra(
    document.getElementById('palavraAdicionar').value.toUpperCase()
  )
  telaAdicionar.classList.add('oculto')
  telaJogo.classList.remove('oculto')
  novoJogo()
})

var btCancelar = document.querySelector('.btCancelar')
btCancelar.addEventListener('click', function () {
  telaAdicionar.classList.add('oculto')
  telaInicial.classList.remove('oculto')
})

var btDesistir = document.querySelector('.btDesistir')
btDesistir.addEventListener('click', function () {
  telaJogo.classList.add('oculto')
  telaInicial.classList.remove('oculto')
})

var btNovo = document.querySelector('.btNovo')
btNovo.addEventListener('click', function () {
  novoJogo()
})

var canvas = document.getElementById('forca').getContext('2d');
  var letras = [];
  var palavraCorreta = '';
  var palavraSecreta = '';
  var palavra = '';
  var erros = 9;

function limparVariaveis(){
  letras = [];
  palavraCorreta = '';
  palavraSecreta = '';
  palavra = '';
  erros = 9;
}

function adicionarPalavra(palavra) {
  palavras.push(palavra)
}

function escolherPalavraSecreta() {
  var palavra = palavras[Math.floor(Math.random() * palavras.length)];
  palavraSecreta = palavra;
  console.log(palavra);
  return palavra;
}

// desenhando traços com o canvas
function escreverTracinhos() {
  canvas.lineWidth = 6;
  canvas.lineCap = 'round';
  canvas.LineJoin = 'round';
  canvas.strokeStyle = '#0A3871';
  canvas.beginPath();
  var eixo = 600 / palavraSecreta.length;
  for (let i = 0; i < palavraSecreta.length; i++) {
    canvas.moveTo(350 + eixo * i, 640); // colocar parênteses
    canvas.lineTo(400 + eixo * i, 640); // colocar parênteses
  }
  canvas.stroke();
  canvas.closePath();
}

function escreverLetraCorreta(index) {
  canvas.font = 'bold 52px Ubuntu';
  canvas.lineWidth = 6;
  canvas.lineCap = 'round';
  canvas.LineJoin = 'round';
  canvas.strokeStyle = '#0A3871';
  var eixo = 600 / palavraSecreta.length;
  canvas.fillText(palavraSecreta[index], 355 + eixo * index, 620);
  canvas.stroke();
}

function escreverLetraIncorreta(letra, errorsLeft) {
  canvas.font = 'bold 40px Ubuntu';
  canvas.lineWidth = 6;
  canvas.lineCap = 'round';
  canvas.LineJoin = 'round';
  canvas.strokeStyle = '#0A3871';
  canvas.fillText(letra, 385 + 40 * (10 - errorsLeft), 710, 40);
}

function verificarLetraCorreta(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    console.log(key);
    letras.push(key);
    return false;
  } else {
    letras.push(key.toUpperCase);
    return true;
  }
}

function adicionarLetraCorreta(i) {
  palavraCorreta += palavraSecreta[i];
  if (palavraCorreta.length == palavraSecreta.length){
    escreveResultado('ganhou')
  }
  console.log(palavraCorreta)
  console.log(palavraSecreta)
}

function adicionarLetraIncorreta(letter) {
  if (palavraSecreta.indexOf(letter) <= 0) {
    erros -= 1;
  }
}

document.onkeydown = (e) => {
  var letra = e.key.toUpperCase();
  if (!verificarLetraCorreta(e.key)) {
    if (palavraSecreta.includes(letra)) {
      /* adicionarLetraCorreta(palavraSecreta.indexOf(letra));*/
      for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] === letra) {
          adicionarLetraCorreta(palavraSecreta.indexOf(letra))
          escreverLetraCorreta(i);
        }
      }
    }
   else {
    if (!verificarLetraCorreta(e.key)) 
    return
    adicionarLetraIncorreta(letra);
    escreverLetraIncorreta(letra, erros);
    desenhaForca(erros)
    console.log(erros)
  }
}
};


function desenhaForca(erro) {
  var canvas = document.getElementById('forca').getContext('2d')
  canvas.lineWidth = 6;
  canvas.lineCap = 'round';
  canvas.LineJoin = 'round';
  canvas.strokeStyle = '#0A3871';

  if (erro == 8) {
    // Base
    canvas.beginPath()
    canvas.moveTo(353, 390)
    canvas.lineTo(747, 390)
    canvas.stroke()

    // 1º Linha
    canvas.beginPath()
    canvas.moveTo(380, 390)
    canvas.lineTo(380, 10)
    canvas.stroke()
  }
  
  if (erro == 7) {
    // 2ª Linha
    canvas.beginPath()
    canvas.moveTo(375, 10)
    canvas.lineTo(563, 10)
    canvas.stroke()
  }

  if (erro == 6) {
    // 3ª Linha
    canvas.beginPath()
    canvas.moveTo(558, 10)
    canvas.lineTo(558, 65)
    canvas.stroke()
  }

  if (erro == 5) {
    // Cabeça
    canvas.beginPath()
    canvas.arc(558, 95, 32, 0, Math.PI * 2)
    canvas.stroke()
  }

  if (erro == 4) {
    // Corpo
    canvas.beginPath()
    canvas.moveTo(558, 130)
    canvas.lineTo(558, 265)
    canvas.stroke()
  }

  if (erro == 3) {
    // 1º Braço
    canvas.beginPath()
    canvas.moveTo(558, 130)
    canvas.lineTo(500, 202)
    canvas.stroke()
  }

  if (erro == 2) {
    // 2º Braço
    canvas.beginPath()
    canvas.moveTo(558, 130)
    canvas.lineTo(616, 202)
    canvas.stroke()
  }

  if (erro == 1) {
    // 1ª Perna
    canvas.beginPath()
    canvas.moveTo(558, 262)
    canvas.lineTo(500, 334)
    canvas.stroke()
  }
  
  if (erro == 0) {
    // 2ª Perna
    canvas.beginPath()
    canvas.moveTo(558, 262)
    canvas.lineTo(616, 334)
    canvas.stroke()
    escreveResultado('perdeu')
  }
}

function escreveResultado(resultado) {
  if (resultado == 'ganhou') {
    canvas.font = 'bold 52px Ubuntu';
    canvas.fillText('Você Ganhou!', 353, 480);
    canvas.stroke();
  } else if (resultado == 'perdeu') {
    canvas.font = 'bold 52px Ubuntu';
    canvas.fillText('Você perdeu!', 353, 480);
    canvas.stroke();
  }
}

function novoJogo() {
  limparVariaveis()
  canvas.clearRect(0, 0, 1200, 860);
  escreverTracinhos(escolherPalavraSecreta());
}