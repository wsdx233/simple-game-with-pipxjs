const app = new PIXI.Application(
{
  width: window.innerWidth,
  height: window.innerHeight
})
//创建App

const blocks = []

document.body.appendChild(app.view)

var rect = new PIXI.Graphics()
rect.beginFill(0xFFFFFF)
rect.drawRect(0,0,70,15)
rect.interactive = true
rect.on("pointermove",function(event){
  this.position.x = event.data.getLocalPosition(app.stage).x
  this.x -= this.width /2
})
rect.position.set(150,500)
app.stage.addChild(rect)


var ball = new PIXI.Graphics()
ball.vel = {
  x : 110,
  y : 210
}
ball.beginFill(0xFFFFFF)
ball.drawCircle(0,0,8)
ball.position.set(100,350)
app.stage.addChild(ball)

app.ticker.add(function(delay){
  ball.x += ball.vel.x * 0.1 * delay
  ball.y += ball.vel.y * 0.1 * delay
  
  if(hitTestRectangle(rect,ball)){
    ball.vel.y = (0 - ball.vel.y)
  }
  
  for (eblocki in blocks){
    let eblock = blocks[eblocki]
    if(hitTestRectangle(eblock,ball)){
      app.stage.removeChild(eblock)
      blocks.splice(eblocki,1)
      ball.vel.y = 0 - ball.vel.y
      
      if(blocks.length <= 0){
        alert('YOU WIN!')
      }
    }
  }
  
  let ballOutType = isOutBound(ball)
  
  if(ballOutType == 'X'){
    ball.vel.x = 0 - ball.vel.x
  } else if(ballOutType == 'Y') {
    if(ball.y > rect.y){
      //掉落在地上
      console.log('YOU LOST')
      alert('YOU LOST')
      ball.vel = {x:0,y:0}
      ball.y = 0
    }
    ball.vel.y= 0 - ball.vel.y
  }
})

//出场地矫正
function isOutBound(sprite){
  if(sprite.x + sprite.width >= window.innerWidth || sprite.x <= 0 ){
    return 'X'
  } else if (sprite.y + sprite.height >= window.innerHeight || sprite.y <= 0){
    return 'Y'
  } else {
    return 'N'
  }
}

//矩形碰撞检查
function hitTestRectangle(r1, r2) {
  let hit = false; //是否发生碰撞

  //获取矩形中心点
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;
  //计算矩形中心点距离
  const vx = Math.abs(r1.centerX - r2.centerX);
  const vy = Math.abs(r1.centerY - r2.centerY);
  //计算矩形合并时尺寸
  const combinedHalfWidth = (r1.width + r2.width) / 2;
  const combinedHalfHeight = (r1.height + r2.height) / 2;
  //检测矩形是否发生碰撞
  if (combinedHalfWidth > vx && combinedHalfHeight > vy) {
    hit = true;
  }

  return hit;
}

const blockConfig = {
  size : {
    w : 17,
    h : 17
  },
  
  lines:{
    x : 10,
    y : 7
  },
  
  startY : 50,
  
  split : 10
}

//获取Block
function getBlock(pos){
  let block = new PIXI.Graphics()
  block.beginFill(0xFFFFFF)
  block.drawRect(0,0,blockConfig.size.w,blockConfig.size.h)
  app.stage.addChild(block)
  blocks.push(block)
  return block
}

console.log(blockConfig)

let stX = (blockConfig.lines.x)*blockConfig.size.w + (blockConfig.lines.x)  * blockConfig.split
var fstX = (window.innerWidth / 2) - stX/2

for(let y = 1; y <= blockConfig.lines.y ; y ++){
  //行高
  
  let trY = blockConfig.startY + y*blockConfig.size.h + (y-1) * blockConfig.split
  
  
  for (let x=0; x <= blockConfig.lines.x;x ++){
    //行宽
    let trX = fstX +  x*blockConfig.size.w + blockConfig.split * (x-1)
    
    let block = getBlock()
    block.position.set(trX,trY)
  }
}
