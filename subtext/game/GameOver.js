window.addEventListener("load", init);

function init() {
    GameOver = function() {
        alert("ゲームオーバー");
        createjs.Ticker.removeAllEventListeners();
        stage.removeAllEventListeners();
    }
}