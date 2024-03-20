//variáveis de placar
let meusPontos = 0;
let pontosDoOponente = 0;

//variáveis da bola
let XBola = 300;
let YBola = 200;
let diametroBola = 30;
let raio = diametroBola /2;

//velocidade da bola
let velocidadeXBola = 8;
let velocidadeYBola = 8;

//variáveis da minha raquete
let XRaquete = 5;
let YRaquete = 155;
let larguraRaquete = 10;
let alturaRaquete = 90;

let colidiu = false

//variáveis da raquete oponente
let XRaqueteOponente = 585; 
let YRaqueteOponente = 155;
let velocidadeYRaqueteOponente;
let chanceDeErrar = 0;

//variáveis de som
let trilha;
let ponto;
let raquetada;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBola();
  moveBola();
  verificaColisaoBorda();
  mostraRaquete(XRaquete, YRaquete);
  moveRaquete();
  verificaColisaoRaquete (XRaquete, YRaquete);
  mostraRaquete(XRaqueteOponente, YRaqueteOponente);
  moveRaqueteOponente();
  verificaColisaoRaquete (XRaqueteOponente, YRaqueteOponente);
  incluiPlacar();
  marcaPonto ();
  bolinhaNaoFicaPresa();
}

function bolinhaNaoFicaPresa(){
    if (XBola - raio < 0){
      XBola = 23
    }
    if (XBola + raio > 600){
      XBola = 580
    }
}

function mostraBola(){
  circle(XBola, YBola, diametroBola);
}

function moveBola(){
  XBola += velocidadeXBola;
  YBola += velocidadeYBola;
}

function verificaColisaoBorda(){
  if (XBola + raio> width || XBola - raio < 0) {velocidadeXBola *= -1}
  if (YBola + raio> height || YBola - raio < 0) {velocidadeYBola *= -1}
}

function mostraRaquete (x, y){
  rect(x, y, larguraRaquete, alturaRaquete);
}

function moveRaquete (){
  if (keyIsDown(UP_ARROW)) {YRaquete -= 10}
  if (keyIsDown(DOWN_ARROW)) {YRaquete += 10}
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, XBola, YBola, diametroBola);
  if (colidiu) {velocidadeXBola *= -1;
               raquetada.play();}
}

function moveRaqueteOponente(){
  velocidadeYRaqueteOponente = YBola -YRaqueteOponente -alturaRaquete + 30 + chanceDeErrar;
  YRaqueteOponente += velocidadeYRaqueteOponente;
  calculaChanceDeErrar();
}

function calculaChanceDeErrar(){
  if (pontosDoOponente > meusPontos + 1) {
    chanceDeErrar = random (-54, -50)}
  else {chanceDeErrar = 0}
}
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(240, 136, 0));
  rect(180, 15, 40, 20);
  fill(color(240, 136, 0));
  rect(380, 15, 40, 20);
  noStroke();
  fill(255);
  text(meusPontos, 200, 30);
  fill(255);
  text(pontosDoOponente, 400, 30);
}
function marcaPonto (){
  if (XBola > 590) {meusPontos += 1; ponto.play();}
  if (XBola < 15) {pontosDoOponente += 1; ponto.play();}
}