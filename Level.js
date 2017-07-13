function Level(){
  this.canos = [];
  this.x = 0;
  this.y = 0;
  this.vx = 50;
  this.width = 0;
  this.height = 0;
  this.color = "blue";
  this.contaPonto = true;
}

Level.prototype.init = function(){
    this.insereCano();
};

Level.prototype.insereCano = function(){
	var random1 = Math.floor((Math.random() * 279) + 1);
	var random2 = Math.floor((Math.random() * 250) + 20);
    var cano = new Level();
    cano.x = 400;
    cano.y = 0;
    cano.width = 50;
    cano.height = random1;
    this.canos.push(cano);
	
	cano = new Level();
    cano.x = 400;
    cano.y = random1 + 120; //random1 + random2 //tamanho abertura fixa 120
    cano.width = 50;
    cano.height = 400;
    this.canos.push(cano);
};


Level.prototype.desenhar = function (ctx){
  for (var i = 0; i < this.canos.length; i++) {
	ctx.fillStyle = this.canos[i].color;
	ctx.fillRect(this.canos[i].x, this.canos[i].y, this.canos[i].width, this.canos[i].height);
	ctx.strokeStyle = "black";
	ctx.strokeRect(this.canos[i].x, this.canos[i].y, this.canos[i].width, this.canos[i].height);
  }
};

Level.prototype.mover = function (dt){
	if(this.canos.length == 2 && this.canos[0].x < 100)
		this.insereCano();
	for (var i = 0; i < this.canos.length; i++) {
		if(this.canos[i].x < - this.canos[i].width){
			this.canos.shift();
		}
		
		if(this.canos[i].x + this.canos[i].width < 200 && this.canos[i].contaPonto && i%2 == 1 && !perdeu){
			pontos++;
			this.canos[i].contaPonto = false;
		}
		this.canos[i].x = this.canos[i].x - this.canos[i].vx*dt;
	}
};

Level.prototype.colidiuCom = function (alvo, resolveColisao){
	for (var i = 0; i < this.canos.length; i++) {
		if(i%2 == 0 ){
			if(this.canos[i].x + this.canos[i].width < alvo.x) continue;
			if(this.canos[i].x > alvo.x + alvo.width) continue;
			if(this.canos[i].y + this.canos[i].height < alvo.y) continue;
			
			resolveColisao(this.canos[i], alvo);
		}else{
			if(this.canos[i].x + this.canos[i].width < alvo.x) continue;
			if(this.canos[i].x > alvo.x + alvo.width) continue;
			if(alvo.y + alvo.height < this.canos[i].y) continue;

			resolveColisao(this.canos[i], alvo);
		}
  }
};

/*
Level.prototype.perseguir = function (alvo, dt) {
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].perseguir(alvo, dt);
  }
};*/
