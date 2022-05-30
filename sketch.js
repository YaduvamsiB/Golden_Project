var shooter, shooterImg;
var bg;
var bullet, bulletImg;
var zombie, zombie1Img, zombie2Img, zombie3Img;
var zombieGroup, bulletGroup;

function preload() {
  shooterImg = loadImage("images/shooter_2.png");
  shootingImg = loadImage("images/shooter_3.png");

  bg = loadImage("images/bg.jpeg");

  zombie1Img = loadImage("images/z1.png");
  zombie2Img = loadImage("images/z2.png");
  zombie3Img = loadImage("images/z3.png");

  bulletImg = loadImage("images/bullet.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  zombieGroup = createGroup();
  bulletGroup = createGroup();
  shooter = createSprite(100, 200, 50, 50);
  shooter.addImage("Shooter", shooterImg);
  shooter.scale = 0.3;
}

function draw() {
  background(bg);

  if (keyDown("UP_ARROW")) {
    shooter.y = shooter.y - 5;
  }
  if (keyDown("DOWN_ARROW")) {
    shooter.y = shooter.y + 5;
  }
  if (keyWentDown("space")) {
    shooter.addImage("Shooter", shootingImg);
    createBullet();
  }
  if (keyWentUp("space")) {
    shooter.addImage("Shooter", shooterImg);
  }

  if (bulletGroup.isTouching(zombieGroup)) {
    for (var i = 0; i < zombieGroup.length; i++) {
      if (zombieGroup[i].isTouching(bulletGroup)) {
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
      }
    }
  }
  createZombie();
  drawSprites();
}

function createBullet() {
  bullet = createSprite(shooter.x + 45, shooter.y - 25, 10, 10);
  bullet.velocityX = 5;
  bullet.scale = 0.07;
  bullet.addImage("bullet", bulletImg);
  bulletGroup.add(bullet);
}

function createZombie() {
  if (frameCount % 100 === 0) {
    zombie = createSprite(
      Math.round(random(width / 2, width)),
      Math.round(random(40, height - 40)),
      20,
      20
    );

    zombie.debug = true;

    zombie.velocityX = -2;
    zombieGroup.add(zombie);
    var r = Math.round(random(1, 3));

    switch (r) {
      case 1:
        zombie.addImage("1", zombie1Img);
        zombie.scale = 0.05;
        break;
      case 2:
        zombie.addImage("2", zombie2Img);
        zombie.scale = 0.1;
        break;
      case 3:
        zombie.addImage("3", zombie3Img);
        zombie.scale = 0.16;
        break;
      default:
        break;
    }
  }
}
