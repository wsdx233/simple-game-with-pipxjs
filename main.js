const type = PIXI.utils.isWebGLSupported() ? "WebGL" : "canvas";
PIXI.utils.sayHello('wsdx233');
const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight })
document.body.appendChild(app.view);

var sprite = PIXI.Sprite.from('src/logo.png')
sprite.width = 100
sprite.height = 100


sprite.x = 100
app.stage.addChild(sprite)

var vel = {
  x: 35,
  y: 40
}

function resolve(val) {
  if (val == 'X') {
    //反转X速度
    vel.x = 0 - vel.x
  } else if (val == 'Y') {
    //反转Y轴速度
    vel.y = 0 - vel.y
  }
}

app.ticker.add(function(delay) {
  sprite.x += vel.x * delay * 0.1
  sprite.y += vel.y * delay * 0.1

  if ((sprite.x + sprite.width >= window.innerWidth) || (sprite.x <= 0))
  {
    resolve('X')
  } else if ((sprite.y + sprite.height >= window.innerHeight) || (sprite.y <= 0)) {
    resolve('Y')
  }
})

app.renderer.backgroundColor = 0xFFFFFF