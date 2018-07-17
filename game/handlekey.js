window.addEventListener("load", init);
function init() {
    // キーボードイベントの登録
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    function handleKeyDown(event) {
        let keyCode = event.keyCode;

        if (keyCode == 32) { // space
            if (scene == 0) {
                scene = 1;
                stage.removeChild(titleText);
                stage.removeChild(howToText);
                stage.removeChild(pressSpaceText);
            }
            else {
                let bullet = new createjs.Shape();
                bullet.graphics.beginFill("white").drawCircle(0, 0, 3);
                bullet.x = player.x;
                bullet.y = player.y;

                bulletList.push(bullet);
                stage.addChild(bullet);
            }
        }
        if (keyCode == 39)   // 右
            isPressRight = true;

        else if (keyCode == 37)  // 左
            isPressLeft = true;

        else if (keyCode == 40)  // 下
            isPressDown = true;

        else if (keyCode == 38)  // 上
            isPressUp = true;
    }

    function handleKeyUp(event) {
        let keyCode = event.keyCode;
        if (keyCode == 39) { // 右
            isPressRight = false;// 真偽値が切り替わる
        } else if (keyCode == 37) { // 左
            isPressLeft = false;
        } else if (keyCode == 40) { // 下
            isPressDown = false;
        } else if (keyCode == 38) { // 上
            isPressUp = false;
        }
    }
}
