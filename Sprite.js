function Sprite(){
  this.g = 600;
  this.x = 200;
  this.y = 200;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.width = 34;
  this.height = 24;
  this.color = "blue";
  this.imagem = new Image();
  this.imagem.src = "jogador.png";
}

Sprite.prototype.desenhar = function (ctx){
  /*ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.strokeStyle = "black";
  ctx.strokeRect(this.x, this.y, this.width, this.height);*/
  
  ctx.drawImage(this.imagem, this.x, this.y);
}

Sprite.prototype.mover = function (dt){
  //Aceleração
  //this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;

  //Velocidade
  //this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
}

//Colisão retangular
Sprite.prototype.colodiuCom = function(alvo){
  if(this.x + this.width < alvo.x)return false;
  if(this.x > alvo.x + this.width)return false;
  if(this.y + this.height < alvo.y)return false;
  if(this.y > alvo.y + this.height)return false;
  return true;
}

Sprite.prototype.perseguir = function(alvo, dt){
  this.ax = 10*dt*(alvo.x - this.x) - 0.05*this.vx;
  this.ay = 10*dt*(alvo.y - this.y) - 0.05*this.vy;
}
