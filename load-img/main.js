window.addEventListener("load", init);

function init() {
    let stage = new createjs.Stage("myCanvas");
    let count = 0;
    let enemyList = [];
//            let bulletList = [];
    let scene = 0;

    let bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, 960, 540);
    stage.addChild(bg);

//            let player = new createjs.Shape();
    let player = new createjs.Bitmap('../img/touhou50.png');
    player.crossOrigin="Anonymous";
//            player.graphics.beginFill("white").drawCircle(0, 0, 10);

//            player.scaleX = 0.2;
    player.scaleX = 60 / player.getBounds().width;
//            player.scaleY = 2000;


    player.x = 20;
//            player.y = window.innerHeight / 2;
    player.y = stage.canvas.height / 2;
//            console.log(stage.canvas.width);

    // x,yの位置に画像の中央が表示されるように設定
    player.regX = player.getBounds().width / 2;
    player.regY = player.getBounds().height / 2;


    stage.addChild(player);

//            stage.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

//            createjs.Ticker.setFPS(60);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.addEventListener("tick", stage);

    const SPACE = 32;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    let isSpace = false;
    let isLeft = false;
    let isUp = false;
    let isRight = false;
    let isDown = false;

    function handleKeyDown(event) {
        let keyCode = event.keyCode;

        if (keyCode === SPACE) {
            isSpace = true;
            let bullet = new createjs.Shape();
            bullet.graphics.beginFill("white").drawCircle(0, 0, 3);
            bullet.x = player.x;
            bullet.y = player.y;

            bulletList.push(bullet);
            stage.addChild(bullet);

        }
        else if (keyCode === LEFT) {
            isLeft = true;
        }
        else if (keyCode === UP) {
            isUp = true;
        }
        else if (keyCode === RIGHT) {
            isRight = true;
        }
        else if (keyCode === DOWN) {
            isDown = true;
        }
    }

    function handleKeyUp(event) {
        let keyCode = event.keyCode;

//                console.log(keyCode);

        if (keyCode === SPACE) {
            isSpace = false;
        }
        else if (keyCode === LEFT) {
            isLeft = false;
        }
        else if (keyCode === UP) {
            isUp = false;
        }
        else if (keyCode === RIGHT) {
            isRight = false;
        }
        else if (keyCode === DOWN) {
            isDown = false;
        }
    }

    let releaseUp = true;
    let releaseDown = true;
    function spaceKeyDown() {
        if(isSpace){
            if(releaseUp){
                releaseUp = false;
                return true;
            } else {
                return false;
            }
        } else {
            releaseUp = true;
            return false;
        }
    }

    function handleTick() {
//                if(isRight) {
//                    bitmap.x +=　3;
//                }
//                console.log("Bounds() " + bitmap.getBounds());
        console.log(player.getBounds().width);

        if(isLeft === true) {
            player.x -= 3;
        }
        if(isUp === true){
            player.y -= 3;
        }
        if(isRight === true){
            player.x += 3;
        }
        if(isDown === true) {
            player.y += 3;
        }

//                if(isSpace === true) {
        if(spaceKeyDown() === true) {
            let bullet = new createjs.Shape();
            bullet.graphics.beginFill("white").drawCircle(0, 0, 3);
            bullet.x = player.x;
            bullet.y = player.y;

            bulletList.push(bullet);
            stage.addChild(bullet);
        }

        if (count % 100 === 0) {
            let enemy = new createjs.Shape();
            enemy.graphics.beginFill("red").drawCircle(0, 0, 10);

            enemy.x = 960;
            enemy.y = 540 * Math.random();

            stage.addChild(enemy);
            enemyList.push(enemy);
        }
        count = count + 1;

        for (let i = 0; i < enemyList.length; i++) {
            enemyList[i].x -= 2;
        }

        for (let i = 0; i < bulletList.length; i++) {
            bulletList[i].x += 10;
        }

        for (let i = 0; i < enemyList.length; i++) {
            let enemyLocal = enemyList[i].localToLocal(0, 0, player);
            if (player.hitTest(enemyLocal.x, enemyLocal.y)) {
                gameOver();
            }
        }

        for (let i = 0; i < bulletList.length; i++) {
            for (let j = 0; j < enemyList.length; j++) {
                let localPoint = bulletList[i].localToLocal(0, 0, enemyList[j]);
                if (enemyList[j].hitTest(localPoint.x, localPoint.y)) {
                    stage.removeChild(bulletList[i]);
                    bulletList.splice(i, 1);

                    stage.removeChild(enemyList[j]);
                    enemyList.splice(j, 1);
                }
            }
        }

        stage.update();
    }

    function gameOver() {
        alert("ゲームオーバー");

        createjs.Ticker.removeAllEventListeners();
        stage.removeAllEventListeners();
    }
}