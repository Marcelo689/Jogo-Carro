var tela = document.getElementById("tela");
function copiarObjecto(obj, nome , cor , x) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    var temp = obj.constructor();
    for (var key in obj) {
        temp[key] = copiarObjecto(obj[key]);
    }

    temp.nome = nome;
    temp.cor  = cor;
    temp.x   += x;
    return temp;
}


var contexto = tela.getContext("2d");

function PintaFundoPreto(contexto){
    contexto.fillStyle = "black";
    contexto.fillRect(0,0, tela.clientWidth, tela.clientHeight);
    contexto.fill();
}

var carro = {
    nome  : "fusca",
    height: 10,
    width : 10,
    cor   : "yellow",
    speed :  1,
    x     : 700,
    y     : 700,
    baseSpeed : 3,
    jaAcabou : false,
    moveCima: function(contexto){
        if(this.jaAcabou)
            return;
        this.y -= this.speed;
        this.atualizaFrameCarro(contexto)
    },
    
    moveBaixo: function(contexto){
        if(this.jaAcabou)
            return;
        this.y += this.speed;
        this.atualizaFrameCarro(contexto);
    },

    moveEsquerda: function(){
        if(this.jaAcabou)
            return;
        this.x -= this.speed;
        this.atualizaFrameCarro(contexto);
    },

    moveDireita: function(contexto){
        if(this.jaAcabou)
            return;
        this.x += this.speed;
        this.atualizaFrameCarro(contexto);
    },

    atualizaFrameCarro: function(contexto){
        if(this.jaAcabou)
            return;
        contexto.fillStyle = this.cor;
        contexto.fillRect(this.x, this.y, this.width, this.height);
        contexto.fill();
    },

    saiuDoMapa: function(contexto){
        var retorno = false;
        if(this.x < 0 || this.y < 0)
            retorno =  true;
        if(this.x > 1500 || this. y > 750)
            retorno = true;
        if(retorno && !this.jaAcabou){
            this.jaAcabou = true;
            console.log(this.nome);
        }
        return retorno;
    }
}

var inimigo  = copiarObjecto(carro, "opala"    , "blue"      , 100);
var inimigo1 = copiarObjecto(carro, "chevete"  , "lightgreen", 200);
var inimigo2 = copiarObjecto(carro, "uno"      , "white"     , -100);
var inimigo3 = copiarObjecto(carro, "brasilia" , "green"     , 300);
var inimigo4 = copiarObjecto(carro, "caminhão" , "red"       , -300);

// Adiciona eventos de movimento do carro
window.addEventListener("keypress", function( evento){
    if(event.keyCode == 119){
        carro.moveCima(contexto);
    }
    if(event.keyCode == 100){
        carro.moveDireita(contexto);
    }
    if(event.keyCode == 97){
        carro.moveEsquerda(contexto);
    }
    if(event.keyCode == 115){
        carro.moveBaixo(contexto);
    }
})

function randomizaVelocidade(objeto){
    var multiplicador = Math.random( ) * 2.0;
    objeto.speed = objeto.baseSpeed * multiplicador;
}

var rodaJogo = setInterval( () => {
    contexto.clearRect(0,0, 1500, 750);
    PintaFundoPreto(contexto);
    randomizaVelocidade(inimigo);
    randomizaVelocidade(inimigo1);
    randomizaVelocidade(inimigo2);
    randomizaVelocidade(inimigo3);
    randomizaVelocidade(inimigo4);
    randomizaVelocidade(carro);

    inimigo.moveCima(contexto);
    inimigo1.moveCima(contexto);
    inimigo2.moveCima(contexto);
    inimigo3.moveCima(contexto);
    inimigo4.moveCima(contexto);
    carro.moveCima(contexto);

    inimigo.saiuDoMapa(contexto);
    inimigo1.saiuDoMapa(contexto);
    inimigo2.saiuDoMapa(contexto);
    inimigo3.saiuDoMapa(contexto);
    inimigo4.saiuDoMapa(contexto);
    carro.saiuDoMapa(contexto);

    if(carro.jaAcabou && inimigo.jaAcabou && inimigo1.jaAcabou && inimigo2.jaAcabou && inimigo3.jaAcabou && inimigo4.jaAcabou)
        clearInterval(rodaJogo);
}, 10);

