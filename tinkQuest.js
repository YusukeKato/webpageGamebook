(function () {
    'use strict';
    const flag1Button = document.getElementById('flag2_1');
    const flag2Button = document.getElementById('flag2_2');
    const flag3Button = document.getElementById('flag2_3');
    const flag4Button = document.getElementById('flag2_4');
    const flag5Button = document.getElementById('flag2_5');
    const GoButton = document.getElementById('Go');
    var flag = 0;//選択肢
    var stage = 0;//ステージ
    var onflag = false;//ボタンを押したかどうか

    flag1Button.onclick = () => {//ボタン１が押された
        flag = 1;
        document.getElementById("flag2").textContent = "選択：1";
    }
    flag2Button.onclick = () => {//ボタン２が押された
        flag = 2;
        document.getElementById("flag2").textContent = "選択：2";
    }
    flag3Button.onclick = () => {//ボタン３が押された
        flag = 3;
        document.getElementById("flag2").textContent = "選択：3";
    }
    flag4Button.onclick = () => {//ボタン４が押された
        flag = 4;
        document.getElementById("flag2").textContent = "選択：4";
    }
    flag5Button.onclick = () => {//ボタン５が押された
        flag = 5;
        document.getElementById("flag2").textContent = "選択：5";
    }
    GoButton.onclick = () => {
        onflag = true;
        Eventfunc();
    }

    function Eventfunc() {
        
    }
})();