window.addEventListener("load", init);

function init() {
     stage = new createjs.Stage("myCanvas");
     count = 0; /// Tickイベントのカウント
     enemyList = [];
     bulletList = [];
     scene = 0;

    // 背景
    let bg = new createjs.Shape();
    bg.graphics.beginFill("black")
        .drawRect(0, 0, 960, 540);
    stage.addChild(bg);

    // 自機
    player = new createjs.Shape();
    player.graphics.beginFill("white")
        .moveTo(5, 0)
        .lineTo(-10, 5)
        .lineTo(-10, -5)
        .closePath();
    player.x = 480;
    player.y = 270;

    // タイトル画面
    titleText = new createjs.Text("Shooting Game", "40px sans-serif", "white");
    titleText.x = 480;
    titleText.y = 50;
    titleText.textAlign = "center";
    stage.addChild(titleText);

    howToText = new createjs.Text("操作方法:自機を動かす(十字キー)、弾を撃つ(スペースキー)", "20px sans-serif", "white");
    howToText.x = 480;
    howToText.y = 100;
    howToText.textAlign = "center";
    stage.addChild(howToText);

    pressSpaceText = new createjs.Text("Press Space key", "40px sans-serif", "white")
    pressSpaceText.x = 480;
    pressSpaceText.y = 150;
    pressSpaceText.textAlign = "center";
    stage.addChild(pressSpaceText);

    // Tickイベントの登録
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick() {
        if (scene === 0) {
            stage.update();
        }

        if (scene === 1) {
            stage.addChild(player);

            if (isPressRight == true)
                player.x += 5;
            if (isPressLeft == true)
                player.x -= 5;
            if (isPressDown == true)
                player.y += 5;
            if (isPressUp == true)
                player.y -= 5;

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
                    GameOver();
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
    }
}
