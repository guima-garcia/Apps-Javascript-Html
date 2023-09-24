
//tela
let tela;
let telaLargura = 300;
let telaAltura = 450;
let context;

//passaro
let passaroLargura = 34;
let passaroAltura = 24;
let passaroX = telaLargura / 8;
let passaroY = telaAltura / 2;
let passaroImg;

let passaro = {
    x: passaroX,
    y: passaroY,
    width: passaroLargura,
    height: passaroAltura
}

//canos
let canoArray = [];
let canoLargura = 42;
let canoAltura = 336;
let canoX = telaLargura;
let canoY = 0;

let canoCimaImg;
let canoBaixoImg;

//physics
let velocidadeX = -2;
let velocidadeY = 0; 
let gravidade = 0.4;

let gameOver = false;
let pontos = 0;

var rect = {
    x: telaLargura / 2 - 100,
    y: telaAltura / 2 - 50,
    width: 200,
    height: 100,
};

window.onload = function () {
    tela = document.getElementById("tela");
    tela.height = telaAltura;
    tela.width = telaLargura;
    context = tela.getContext("2d");


    //Carregar Imagens
    passaroImg = new Image();
    passaroImg.src = "assets/flappybird.png";
    passaroImg.onload = function () {
        context.drawImage(passaroImg, -100,-100, passaro.width, passaro.height);
    }

    Playbutton(rect);
    canoCimaImg = new Image();
    canoCimaImg.src = "assets/toppipe.png";

    canoBaixoImg = new Image();
    canoBaixoImg.src = "assets/bottompipe.png";
    document.addEventListener("click", start);
    document.addEventListener("keydown", start);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, tela.width, tela.height);

    //passaro
    velocidadeY += gravidade;
    passaro.y = Math.max(passaro.y + velocidadeY, 0); //aplica a gravidade no valor de y passaro, limitando o passaro.y para o topo da tela "0"
    context.drawImage(passaroImg, passaro.x, passaro.y, passaro.width, passaro.height);

    if (passaro.y > tela.height) {
        gameOver = true;
    }

    //canos
    for (let i = 0; i < canoArray.length; i++) {
        let cano = canoArray[i];
        cano.x += velocidadeX;
        context.drawImage(cano.img, cano.x, cano.y, cano.width, cano.height);

        if (!cano.passed && passaro.x > cano.x + cano.width) {
            pontos += 0.5; //0.5 pois são dois canos o que soma 1 a pontuação
            cano.passed = true;
        }

        if (detectCollision(passaro, cano)) {
            gameOver = true;
        }
    }

    //apagar canos
    while (canoArray.length > 0 && canoArray[0].x < -canoLargura) {
        canoArray.shift(); //remove o primeiro elemento da lista
    }

    //pontos
    if (!gameOver)
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.textAlign = "start";
    context.fillText(pontos, 5, 45);

    if (gameOver) {
        context.clearRect(0, 0, tela.width, tela.height);
        context.textAlign = "center";
        context.fillText("GAME OVER", telaLargura / 2, telaAltura / 2 - 45);
        context.font = "40px sans-serif";
        context.fillText("Pontuação: " + pontos, telaLargura / 2, telaAltura / 2);
        context.font = "16px sans-serif";
        context.fillText("Pressione espaço para jogar", telaLargura / 2, telaAltura / 2+30);

    }
}

function placePipes() {
    if (gameOver) {
        return;
    }

    let randomPipeY = canoY - canoAltura / 4 - Math.random() * (canoAltura / 2);
    let openingSpace = tela.height / 4;

    let topPipe = {
        img: canoCimaImg,
        x: canoX,
        y: randomPipeY,
        width: canoLargura,
        height: canoAltura,
        passed: false
    }
    canoArray.push(topPipe);

    let bottomPipe = {
        img: canoBaixoImg,
        x: canoX,
        y: randomPipeY + canoAltura + openingSpace,
        width: canoLargura,
        height: canoAltura,
        passed: false
    }
    canoArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX" || e.button == 0) {
        //pulo
        velocidadeY = -6;

        //reseta o jogo
        if (gameOver) {
            passaro.y = passaroY;
            canoArray = [];
            pontos = 0;
            gameOver = false;
        }
    }
}

function start(e) {
    if (e.code == "Space" || e.button == 0) {
        requestAnimationFrame(update);
        setInterval(placePipes, 1500); //a cada 1.5 segundos
        document.addEventListener("keydown", moveBird);
        document.addEventListener("click", moveBird);
        document.removeEventListener("click", start);
        document.removeEventListener("keydown", start);
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
        a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
        a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
        a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

function retornar() {
    window.location.href = 'index.html';
}

function Playbutton(rect, lWidth, fillColor, lineColor) {
    context.beginPath();
    context.roundRect(rect.x, rect.y, rect.width, rect.height, [15]);
    context.fillStyle = 'rgba(225,225,225,0.3)';
    context.fill();
    context.lineWidth = 2;
    context.closePath();
    context.font = '45px sans-serif';
    context.fillStyle = '#fff';
    context.textAlign = "center";
    context.fillText('Start', rect.x + rect.width/2, rect.y + rect.height/2+15);
}
