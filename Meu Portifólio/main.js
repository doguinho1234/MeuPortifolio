var img = document.getElementById("buttomPortifolio");

img.addEventListener("mouseover", function () {
    this.src = "Botaoportifoliomouseemcima.png"
});
img.addEventListener("mouseout", function () {
    this.src = "BotaoPortifolio.png"
});

var img = document.getElementById("buttonJogos");

img.addEventListener("mouseover", function () {
    this.src = "jogosbotaoclicado.png"
});
img.addEventListener("mouseout", function () {
    this.src = "jogosbotao.png"
});

var img = document.getElementById("buttonContato");

img.addEventListener("mouseover", function () {
    this.src = "suportemouseemcima.png"
});
img.addEventListener("mouseout", function () {
    this.src = "suporte.png"
});

var personagemIMG;
var personagemX, personagemY;
var velocidade = 5;

var esquerdaPressionada = false;
var direitaPressionada = false;

let tiros = [] // para armazenar cada tiro
let enemies = [] //para armazenar cada enemy criado
let score = 0

function preload() {
    personagemIMG = loadImage('cachorrinho.png');
}


function setup() {
    canvas = createCanvas(1000, 600);//Largura , altura
    canvas.parent('canvasGame');//o canvas será criado dentro da div canvasGame
    canvas.position(200, 10); // x , y
    personagemIMG.resize(60, 60)
    personagemX = width / 2;
    personagemY = 530;


    for (let i = 0; i < 20; i++) {
        let enemy = {
            x: random(0, width),
            y: random(-800, 0)
        }
        enemies.push(enemy)
    }
}

function draw() {
    background('gray')
    image(personagemIMG, personagemX, personagemY);
    if (esquerdaPressionada) {
        personagemX -= velocidade;
    } else if (direitaPressionada) {
        personagemX += velocidade;
    }

    for (let tiro of tiros) {
        circle(tiro.x, tiro.y, 10)
        tiro.y -= 8;
    }


    for (let enemy of enemies) {
        enemy.y += 1 //velocidade do inimigo
        fill('red')
        rect(enemy.x, enemy.y, 10);

        //Game over
        if(enemy.y > height) {
            textSize(50)
            text('GAME OVER', width / 2, height / 2)
            noLoop()
        }
    }

    for (let enemy of enemies) {
        for (let tiro of tiros) {
            if (dist(enemy.x, enemy.y, tiro.x, tiro.y) < 20) {
                enemies.splice(enemies.indexOf(enemy), 1)
                tiros.splice(tiros.indexOf(tiro), 1)
                //recira mais inimigos aleatóriamente conforme eles serem mortos
                let newEnemy = {
                    x: random(0, width),
                    y: random(-800, 0)
                }
                enemies.push(newEnemy)
                //adiciona pontos ao matar
                score++ // score = score + 1
            }
        }
    }

    //atualiza visualmente a pontuação
    text(score, 15, 25)
    fill('white')
}

function keyPressed() {

    if (keyCode === LEFT_ARROW) {
        esquerdaPressionada = true;
    } else if (keyCode === RIGHT_ARROW) {
        direitaPressionada = true;
    }

    if (keyCode === UP_ARROW) {
        let tiro = {
            x: personagemX,
            y: personagemY
        }
        tiros.push(tiro)
    }
}
function keyReleased() {

    if (keyCode === LEFT_ARROW) {
        esquerdaPressionada = false;
    } else if (keyCode === RIGHT_ARROW) {
        direitaPressionada = false;
    }
}