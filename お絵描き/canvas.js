//create by ito 2026/10/30

var cc; // canvas context
var flag = false;
var oldX, oldY; 
var text;
var color;
var drawHistory = []; // 過去のCanvasの状態を保存する配列

function saveHistory() {
    var canvas = document.getElementById("canvas");
    var image = cc.getImageData(0, 0, canvas.width, canvas.height);
    drawHistory.push(image);
}

function onMouseDown(e) {
    // 線を描き始める前の状態を保存
    saveHistory();
    flag = true;
    var rect = e.currentTarget.getBoundingClientRect();
    oldX = e.clientX - rect.left;
    oldY = e.clientY - rect.top;
}
function onMouseUp() {
    flag = false;
}

function onReset() {
    var canvas = document.getElementById("canvas");
    saveHistory();
    cc.clearRect(0, 0, canvas.width, canvas.height);
    flag = false;
}

function onUndo() {
    // 保存した状態がなければ何もしない
    if (drawHistory.length == 0) {
        return;
    }

    var image = drawHistory.pop();
    cc.putImageData(image, 0, 0);
    flag = false;
}

function onMouseMove(e) {
    // ドラッグ中でなければ線を描かない
    if (flag == false) {
        return;
    }
    // マウスが移動した座標を取得
    var x, y;
    const rect = e.currentTarget.getBoundingClientRect(); // Canvasの位置を取得
    x = e.clientX - rect.left; // マウスのX座標
    y = e.clientY - rect.top; // マウスのY座標
    // 1つ前の座標から現在の座標まで線を描く
    cc.save();
    cc.beginPath();
    cc.lineWidth = parseInt(text.value); // 入力された線の太さ
    cc.strokeStyle = color.value; // 選択された線の色
    cc.lineCap = "round"; 
    cc.moveTo(oldX, oldY);
    cc.lineTo(x, y);
    cc.stroke();
    cc.restore();

    // 現在の座標を次回のために記憶
    oldX = x;
    oldY = y;
}
// 初期化処理
function init() {
    // canvas要素を取得
    var canvas = document.getElementById("canvas");
    // canvasの2D描写コンテキストを取得
    cc = canvas.getContext("2d");
    // canvasのドラッグ用マウスイベント設定
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);

    // リセットボタンのクリックイベント設定
    var reset = document.getElementById("reset");
    reset.addEventListener("click", onReset);

    // 1つ戻すボタンのクリックイベント設定
    var undo = document.getElementById("undo");
    undo.addEventListener("click", onUndo);

    text = document.getElementById("text");
    color = document.getElementById("color");
    console.log(text.value);

    // cc.save(); //コンテキストを初期状態で保存
    // cc.beginPath(); //パスを開始
    // cc.lineWidth = parseInt(text.value); //パスの線の太さを5に
    // cc.moveTo(50, 120); //座標をcanvasのx = 50, y = 120の位置に移動する宣言
    // cc.lineTo(250, 180); //x = 250, y = 180の座標まで線を引く宣言
    // cc.stroke(); //線を描く
    // cc.restore(); //コンテキストを上で保存した初期状態に戻す
    /* ここで線の太さや座標の移動、線を引く宣言などをリセットしています。 */
}
// 初期化処理の呼び出し
init();
