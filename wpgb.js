/**
 * START : 9.6.2016
 * LAST  : 9.10.2016
 * WebGame
 * GameBook1
 * Yusuke Kato
 * ＜ゲーム説明＞
 * 各ステージで選択肢３つから行動を選び、それによりイベントが起こる
 * ステージは連続ではなくて、イベントによってどのステージに行くか変わる
 * クリア条件を満たせばクリア
 * ゲームオーバーもある
 * エンド分岐（good,normal,bad）計３つ、増減あり
 * ステージは１０つ、各ステージに選択肢３つ、しかしイベントの数は合計３０ではない。
 * フラグを立てると、同じステージの同じ選択肢を選んでも異なるイベントが起こることもある。
 */

/*
 *　問題点
 *　フラグの変数の山は何とかした方がいい
 *　シングルとダブルが混じってる(保留)
 *  console.logは残すことになる（保留）
 */

(function () {
    'use strict';
    const flag1Button = document.getElementById('flag1');
    const flag2Button = document.getElementById('flag2');
    const flag3Button = document.getElementById('flag3');
    const GoButton = document.getElementById('Go');
    var flag = 0;//選択肢
    var stage = 0;//ステージ
    var onflag = false;//ボタンを押したかどうか
    var HP = 10;//体力
    var Magic = 0;//魔力勇気
    var Merit = 0;//実力
    var Brain = 0;//知力
    var Money = 0;//財力
    //パラメータフラグ
    var flagPra1 = 0;
    var flagPra2 = 0;
    var flagPra3 = 0;
    var flagPra4 = 0;
    //パラメータの順番を記憶
    var flagMagic = 0;
    var flagMerit = 0;
    var flagBrain = 0;
    var flagMoney = 0;
    //取得フラグ
    var flagCourage = 0;//勇気
    var flagKind = 0;//優しき心
    var flagPower = 0;//力の証
    var flagSword = 0;//勇者の剣
    var flagHammer = 0;//投げハンマー
    var flagLaser = 0;//レーザービーム
    //仲間フラグ
    var flagFriend1 = 0;
    var flagFriend2 = 0;
    var flagFriend3 = 0;
    var flagFriend4 = 0;
    var flagfriend5 = 0;
    //メッセージテキスト
    var messegeText = "メッセージを送ります。";
    //flag = 0;をよけるフラグ
    var flagflagEsc = 0;


    flag1Button.onclick = () => {//ボタン１が押された
        flag = 1;
        document.getElementById("flag").textContent = "選択：1";
        console.log("flag = 1");
    }
    flag2Button.onclick = () => {//ボタン２が押された
        flag = 2;
        document.getElementById("flag").textContent = "選択：2";
        console.log("flag = 2");
    }
    flag3Button.onclick = () => {//ボタン３が押された
        flag = 3;
        document.getElementById("flag").textContent = "選択：3";
        console.log("flag = 3");
    }
    GoButton.onclick = () => {
        onflag = true;
        Eventfunc();
    }
    /* パラメータ管理 */
    function parameterfunc() {
        document.getElementById('messege').textContent = "メッセージ　：　" + messegeText;
        document.getElementById('hp-text').textContent = "体力 :" + HP;
        if (flagMagic === 1) {
            document.getElementById('textPra1').textContent = "魔力 : " + Magic;
        } else if (flagMerit === 1) {
            document.getElementById('textPra1').textContent = "実力 : " + Merit;
        } else if (flagBrain === 1) {
            document.getElementById('textPra1').textContent = "知力 : " + Brain;
        } else if (flagMoney === 1) {
            document.getElementById('textPra1').textContent = "財力 : " + Money;
        } else {
            document.getElementById('textPra1').textContent = "";
        }
        if (flagMagic === 2) {
            document.getElementById('textPra2').textContent = "魔力 : " + Magic;
        } else if (flagMerit === 2) {
            document.getElementById('textPra2').textContent = "実力 : " + Merit;
        } else if (flagBrain === 2) {
            document.getElementById('textPra2').textContent = "知力 : " + Brain;
        } else if (flagMoney === 2) {
            document.getElementById('textPra2').textContent = "財力 : " + Money;
        } else {
            document.getElementById('textPra2').textContent = "";
        }
        if (flagMagic === 3) {
            document.getElementById('textPra3').textContent = "魔力 : " + Magic;
        } else if (flagMerit === 3) {
            document.getElementById('textPra3').textContent = "実力 : " + Merit;
        } else if (flagBrain === 3) {
            document.getElementById('textPra3').textContent = "知力 : " + Brain;
        } else if (flagMoney === 3) {
            document.getElementById('textPra3').textContent = "財力 : " + Money;
        } else {
            document.getElementById('textPra3').textContent = "";
        }
        if (flagMagic === 4) {
            document.getElementById('textPra4').textContent = "魔力 : " + Magic;
        } else if (flagMerit === 4) {
            document.getElementById('textPra4').textContent = "実力 : " + Merit;
        } else if (flagBrain === 4) {
            document.getElementById('textPra4').textContent = "知力 : " + Brain;
        } else if (flagMoney === 4) {
            document.getElementById('textPra4').textContent = "財力 : " + Money;
        } else {
            document.getElementById('textPra4').textContent = "";
        }
        if (flagCourage === 1) {
            document.getElementById('p1-text1').textContent = "--勇気";
        } else {
            document.getElementById('p1-text1').textContent = "";
        }
        if (flagKind === 1) {
            document.getElementById('p1-text2').textContent = "--優しい心";
        } else {
            document.getElementById('p1-text2').textContent = "";
        }
        if (flagPower === 1) {
            document.getElementById('p1-text3').textContent = "--力の証明";
        } else {
            document.getElementById('p1-text3').textContent = "";
        }
        if (flagPower === 1) {
            document.getElementById('p1-text4').textContent = "--IQ300";
        } else {
            document.getElementById('p1-text4').textContent = "";
        }
        if (flagSword === 1) {
            document.getElementById('p1-text5').textContent = "--勇者の剣";
        } else if (flagHammer === 1) {
            document.getElementById('p1-text5').textContent = "--投げハンマー";
        } else if (flagLaser === 1) {
            document.getElementById('p1-text5').textContent = "--レーザービーム";
        } else {
            document.getElementById('p1-text5').textContent = "";
        }
        if (flagFriend1 === 1) {
            document.getElementById('p2-text1').textContent = "心優しき青年";
        } else {
            document.getElementById('p2-text1').textContent = "";
        }
        if (flagFriend1 === 2) {
            document.getElementById('p2-text2').textContent = "壊し屋";
        } else {
            document.getElementById('p2-text2').textContent = "";
        }
        if (flagFriend1 === 3) {
            document.getElementById('p2-text3').textContent = "田中さん";
        } else {
            document.getElementById('p2-text3').textContent = "";
        }
        if (flagFriend1 === 4) {
            document.getElementById('p2-text4').textContent = "魔女マジョミ";
        } else {
            document.getElementById('p2-text4').textContent = "";
        }
        if (flagFriend1 === 5) {
            document.getElementById('p2-text5').textContent = "龍狩り";
        } else {
            document.getElementById('p2-text5').textContent = "";
        }

    }
    /* イベント、テキスト、ステージ管理 */
    function Eventfunc() {
        switch (stage) {
            case 0:
                messegeText = "　ゲームがはじまりました。";
                document.getElementById("stage").textContent = "STAGE:0 --- 物語の始まり ---";
                document.getElementById("text").textContent = "ティンクエスト";
                document.getElementById("text1").textContent = "あなたはティンクとなり、";
                document.getElementById("text2").textContent = "この世界を冒険することになる。";
                document.getElementById("text3").textContent = "あなたの選択が世界を変えるだろう。";
                 stage = 1;
                break;
            case 1://ステージ１
                messegeText = "好きなものを選んで";
                document.getElementById("stage").textContent = "STAGE:1 --- 主人公ティンク ---";
                document.getElementById("text").textContent = "ティンクとは何者なのか";
                document.getElementById("text1").textContent = "1:男";
                document.getElementById("text2").textContent = "2:魔王の名";
                document.getElementById("text3").textContent = "3:天高く舞う金色の鳥";
                stage = 2;
                break;
            case 2://ステージ２
                switch (flag) {//選択肢３つ
                    case 1:
                        messegeText = "橋は危ない、本当に";
                        document.getElementById('name').textContent = "ティンク";
                        document.getElementById("stage").textContent = "STAGE:2-1 --- 旅の始まり ---";
                        document.getElementById("text").textContent = "ティンクは旅に出た。目的はない。";
                        document.getElementById("text1").textContent = "1:とりあえず街に入る";
                        document.getElementById("text2").textContent = "2:森に入って狩りをする";
                        document.getElementById("text3").textContent = "3:あの橋を渡る";
                        stage = 3;
                        break;
                    case 2:
                        messegeText = "魔王は最強";
                        document.getElementById("stage").textContent = "STAGE:2-2 --- 魔王登場 ---";
                        document.getElementById("text").textContent = "ティンク（魔王）は世界征服を企む。";
                        document.getElementById("text1").textContent = "1:力で支配する";
                        document.getElementById("text2").textContent = "2:金に物を言わせる";
                        document.getElementById("text3").textContent = "3:心で語りかける";
                        document.getElementById('name').textContent = "ティンク（魔王）";
                        HP += 20;
                        stage = 60;
                        break;
                    case 3:
                        messegeText = "ただの鳥ではない";
                        document.getElementById('name').textContent = "ティンク（鳥）";
                        document.getElementById("stage").textContent = "STAGE:2-3 --- はばたく希望 ---";
                        document.getElementById("text").textContent = "ティンク（金色の鳥）は天高く舞い上がった！！";
                        document.getElementById("text1").textContent = "1:そのまま太陽に突っ込む！！";
                        document.getElementById("text2").textContent = "2:あの広大な海へ飛び込む！！";
                        document.getElementById("text3").textContent = "3:憎き魔王が住む魔王城へ奇襲をかける！！";
                        stage = 0;
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 3://ステージ３
                switch (flag) {
                    case 1:
                        messegeText = "国で一番栄えている街";
                        document.getElementById("stage").textContent = "STAGE:3-1 --- 活気あふれる街 ---";
                        document.getElementById("text").textContent = "街は多くの人で賑わっていた。";
                        document.getElementById("text1").textContent = "1:まずは買い物をする";
                        document.getElementById("text2").textContent = "2:カジノで大儲け";
                        document.getElementById("text3").textContent = "3:とりあえず宿屋で休む";
                        stage = 4;
                        break;
                    case 2:
                        messegeText = "森の中心には・・・・・・";
                        document.getElementById("stage").textContent = "STAGE:3-2 --- 生きる森 ---";
                        document.getElementById("text").textContent = "暗く静かな森、何か得体のしれない気配を感じる。";
                        document.getElementById("text1").textContent = "1:何も考えず突き進む";
                        document.getElementById("text2").textContent = "2:よく考えて突き進む";
                        document.getElementById("text3").textContent = "3:森の妖精に話しかける";
                        stage = 0;
                        break;
                    case 3:
                        messegeText = "この橋を渡るにはどうするかな";
                        document.getElementById("stage").textContent = "STAGE:3-3 --- その橋渡るべからず ---";
                        document.getElementById("text").textContent = "あの今にも落ちそうな朽ちた橋を渡る";
                        document.getElementById("text1").textContent = "1:堂々と歩いて渡る";
                        document.getElementById("text2").textContent = "2:全力で走って渡る";
                        document.getElementById("text3").textContent = "3:叩いてから渡る";
                        stage = 0;
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 4://ステージ４
                switch (flag) {
                    case 1:
                        messegeText = "買い物にはお金が必要";
                        document.getElementById("stage").textContent = "STAGE:4-1 --- 買い物は慎重に ---";
                        document.getElementById("text").textContent = "必要な物がたくさんあり、何を買うか悩む";
                        document.getElementById("text1").textContent = "1:武器";
                        document.getElementById("text2").textContent = "2:食べ物";
                        document.getElementById("text3").textContent = "3:やさしさ";
                        stage = 5;
                        break;
                    case 2:
                        messegeText = "お金は大事";
                        document.getElementById("stage").textContent = "STAGE:4-2 --- 大金持ちの夢 ---";
                        document.getElementById("text").textContent = "カジノで大儲けはずっと夢だった。";
                        document.getElementById("text1").textContent = "すべては金で解決できる。";
                        document.getElementById("text2").textContent = "金こそが人生だ！！";
                        document.getElementById("text3").textContent = "人生を賭け、ティンクは勝負に出る！！";
                        break;
                    case 3:
                        messegeText = "体力が５回復しました";
                        document.getElementById("stage").textContent = "STAGE:4-3 --- 時には一休み ---";
                        document.getElementById("text").textContent = "街で一番安い宿屋を見つけた。";
                        document.getElementById("text1").textContent = "ごはんはそこそこにおいしい。";
                        document.getElementById("text2").textContent = "体力が５回復した！！";
                        document.getElementById("text3").textContent = "旅を続けることにしよう";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 5://ステージ５
                switch (flag) {
                    case 1:
                        messegeText = "一番強そうなのは・・・・・・";
                        document.getElementById("stage").textContent = "STAGE:5-1 --- 武器とは魂である ---";
                        document.getElementById("text").textContent = "自分に合った武器は何だろうか";
                        document.getElementById("text1").textContent = "1:勇者の剣";
                        document.getElementById("text2").textContent = "2:投げる用のハンマー";
                        document.getElementById("text3").textContent = "3:レーザービーム";
                        stage = 6;
                        break;
                    case 2:
                        messegeText = "全部おいしい"
                        document.getElementById("stage").textContent = "STAGE:5-2 --- 食べ物は重要 ---";
                        document.getElementById("text").textContent = "全部おいしそうだ、何を食べるか";
                        document.getElementById("text1").textContent = "1:でかい焼き魚";
                        document.getElementById("text2").textContent = "2:生肉２キログラム";
                        document.getElementById("text3").textContent = "3:トマト１ダース";
                        break;
                    case 3:
                        flagKind = 1;
                        messegeText = "「優しい心」を手に入れた！！"
                        document.getElementById("stage").textContent = "STAGE:5-3 --- 優しさ屋 ---";
                        document.getElementById("text").textContent = "優しさ屋「優しさをお前に売ってやろう」";
                        document.getElementById("text1").textContent = "ティンクは優しさを手に入れた。しかし、代わりに何かを失った。";
                        document.getElementById("text2").textContent = "何かを手に入れるには何かを犠牲にしなくてはならない。";
                        document.getElementById("text3").textContent = "この教訓を胸に秘め、ティンクは旅を続ける。";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 6://ステージ６
                switch (flag) {
                    case 1:
                        flagSword = 1;
                        Merit += 1;
                        flagPra2 = 1;
                        if (flagMerit === 0) {
                            flagMerit = flagPra1 + flagPra2 + flagPra3 + flagPra4;
                        }
                        messegeText = "ついに勇者となった";
                        document.getElementById('name').textContent = "ティンク（勇者）";
                        document.getElementById("stage").textContent = "STAGE:6-1 --- 勇者ティンク ---";
                        document.getElementById("text").textContent = "勇者の剣を手に入れ勇者となった！！";
                        document.getElementById("text1").textContent = "この剣が闇を切り裂き、";
                        document.getElementById("text2").textContent = "世界を救う日も遠くはないだろう。";
                        document.getElementById("text3").textContent = "ティンクの旅はまだ続く。";
                        stage = 7;
                        break;
                    case 2:
                        flagHammer = 1;
                        Merit += 1;
                        flagPra2 = 1;
                        if (flagMerit === 0) {
                            flagMerit = flagPra1 + flagPra2 + flagPra3 + flagPra4;
                        }
                        messegeText = "飛び道具はこすい";
                        document.getElementById("stage").textContent = "STAGE:6-2 --- 飛び道具はこすい ---";
                        document.getElementById("text").textContent = "ハンマーは武器としても優秀であり、";
                        document.getElementById("text1").textContent = "大工になることもできる良き道具である。";
                        document.getElementById("text2").textContent = "ずる賢く戦えば百戦錬磨間違いなし。";
                        document.getElementById("text3").textContent = "ティンクの旅は続く。";
                        break;
                    case 3:
                        flagLaser = 1;
                        flagflagEsc = 1;//flag=0;よける
                        //stage,flag固定
                        stage = 2;
                        flag = 2;
                        //
                        Magic += 3;
                        flagPra1 = 1;
                        if (flagMagic === 0) {
                            flagMagic = flagPra1 + flagPra2 + flagPra3 + flagPra4;
                        }
                        messegeText = "魔王すら容易く貫く伝説の武器";
                        document.getElementById('name').textContent = "ティンク（魔王）";
                        document.getElementById("stage").textContent = "STAGE:6-3 --- これが最強武器 ---";
                        document.getElementById("text").textContent = "レーザービーム";
                        document.getElementById("text1").textContent = "世界最強武器";
                        document.getElementById("text2").textContent = "ティンクはこれで世界を支配することにした。";
                        document.getElementById("text3").textContent = "ティンクは魔王となった。";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 7://ステージ７
                messegeText = "魔王との闘いは近い";
                document.getElementById("stage").textContent = "STAGE:7 --- 旅の先にあるのは ---";
                document.getElementById("text").textContent = "ティンクは街を出た。";
                document.getElementById("text1").textContent = "その眼は自信に満ち溢れいてる。";
                document.getElementById("text2").textContent = "向かうは魔王城と決めた。";
                document.getElementById("text3").textContent = "魔王を倒すのだ！！";
                stage = 8;
                break;
            case 8://ステージ８
                messegeText = "扉はかなり頑丈なようだ"
                document.getElementById("stage").textContent = "STAGE:8 --- 決戦魔王城 ---";
                document.getElementById("text").textContent = "魔王城に着いた。扉は固く閉ざされている。";
                document.getElementById("text1").textContent = "1:ぶち壊す！！";
                document.getElementById("text2").textContent = "2:よじ登る！！";
                document.getElementById("text3").textContent = "3:裏から入る。";
                stage = 90;
                break;
            case 9://ステージ８
                switch (flag) {
                    case 1:
                        stage = 98;
                        document.getElementById("text").textContent = "ティンクは鳥となり空高く舞い上がった！！";
                        document.getElementById("text1").textContent = "1:太陽に突っ込む！！";
                        document.getElementById("text2").textContent = "2:海に突っ込む！！";
                        document.getElementById("text3").textContent = "3:魔王城に突っ込む！！";
                        console.log("stage:8,flag:1");
                        break;
                    case 2:
                        document.getElementById("text").textContent = "";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        console.log("stage:8,flag:2");
                        break;
                    case 3:
                        document.getElementById("text").textContent = "3-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        console.log("stage:8,flag:3");
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 10://ステージ９
                switch (flag) {
                    case 1:
                        stage = 98;
                        document.getElementById("text").textContent = "ティンクは鳥となり空高く舞い上がった！！";
                        document.getElementById("text1").textContent = "1:太陽に突っ込む！！";
                        document.getElementById("text2").textContent = "2:海に突っ込む！！";
                        document.getElementById("text3").textContent = "3:魔王城に突っ込む！！";
                        console.log("stage:9,flag:1");
                        break;
                    case 2:
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        console.log("stage:9,flag:2");
                        break;
                    case 3:
                        document.getElementById("text").textContent = "3-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        console.log("stage:9,flag:3");
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 11://ステージ１１
                switch (flag) {
                    case 1:
                        messegeText = "";
                        document.getElementById("stage").textContent = "STAGE:8 ---  ---";
                        document.getElementById("text").textContent = "";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 2:
                        messegeText = "";
                        document.getElementById("stage").textContent = "STAGE:8 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 3:
                        messegeText = "";
                        document.getElementById("stage").textContent = "STAGE:8 ---  ---";
                        document.getElementById("text").textContent = "3-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 60:
                switch (flag) {
                    case 1:
                        messegeText = "力こそすべて";
                        document.getElementById("stage").textContent = "STAGE:60-1 --- 力の支配 ---";
                        document.getElementById("text").textContent = "ティンクは力による支配を始めた。";
                        document.getElementById("text1").textContent = "村を襲い、街を襲い";
                        document.getElementById("text2").textContent = "";
                        document.getElementById("text3").textContent = "3:";
                        if (flagLaser === 1) {
                            stage = 61;
                        } else {
                            stage = 62;
                        }
                        break;
                    case 2:
                        messegeText = "お金がすべて";
                        document.getElementById("stage").textContent = "STAGE:60-2 --- お金があれば何でもできる ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 3:
                        messegeText = "優しい人は好かれる";
                        document.getElementById("stage").textContent = "STAGE:60-3 --- 魔王のやさしさ ---";
                        document.getElementById("text").textContent = "ティンク（魔王）は人々に優しく語りかけた。";
                        document.getElementById("text1").textContent = "そう、ティンクは争いなど望んでいなかったのだ！！";
                        document.getElementById("text2").textContent = "ティンクの世界平和を望む言葉は";
                        document.getElementById("text3").textContent = "世界中の人々に届いた。";
                        if (flagKind === 1) {
                            stage = 104;
                        } else {
                            stage = 105;
                        }
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 90:
                switch (flag) {
                    case 1:
                        if (Merit >= 3) {
                            flagPower = 1;
                            messegeText = "「強さの証明」を手に入れた！！";
                            document.getElementById("stage").textContent = "STAGE:90-1-1 --- 魔王城入り口 ---";
                            document.getElementById("text").textContent = "ティンクの剣は扉を紙のごとく切り裂いた！！";
                            document.getElementById("text1").textContent = "魔王城へ正々堂々と正面から足を踏み入れる。";
                            document.getElementById("text2").textContent = "そこには闇と恐怖が広がっていた。";
                            document.getElementById("text3").textContent = "しかし、今のティンクは強い！！";
                            stage = 91;
                        } else {
                            messegeText = "ゲームオーバー";
                            document.getElementById("stage").textContent = "STAGE:90-1-2 --- 情けない勇者 ---";
                            document.getElementById("text").textContent = "ティンクの剣は無様に扉に弾かれた。";
                            document.getElementById("text1").textContent = "そして、その衝撃で剣は折れてしまった。";
                            document.getElementById("text2").textContent = "ティンクの旅はここで終わる。";
                            document.getElementById("text3").textContent = "";
                            stage = 110;
                        }
                        break;
                    case 2:
                        messegeText = "開かない扉は壁だ";
                        document.getElementById("stage").textContent = "STAGE:90-2 --- 壁を越えて行け ---";
                        document.getElementById("text").textContent = "扉を越えるとそこには魔王の手下が待ち受けていた！！";
                        document.getElementById("text1").textContent = "ティンクは魔王の手下の攻撃を受けてしまった！！";
                        document.getElementById("text2").textContent = "１０ダメージ！！";
                        HP -= 10;
                        if (HP <= 0) {
                            document.getElementById("text3").textContent = "ティンクの旅はここで終わった・・・・・・";
                            stage = 110;
                        } else {
                            document.getElementById("text3").textContent = "なんとか魔王の手下を倒した。";
                        }
                        break;
                    case 3:
                        document.getElementById("stage").textContent = "STAGE:90-3 ---  ---";
                        document.getElementById("text").textContent = "3-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 91:
                document.getElementById("stage").textContent = "STAGE:91 ---  ---";
                document.getElementById("text").textContent = "3-3";
                document.getElementById("text1").textContent = "1:";
                document.getElementById("text2").textContent = "2:";
                document.getElementById("text3").textContent = "3:";
                stage = 92;
                break;
            case 92:
                switch (flag) {
                    case 1:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 2:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 3:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "3-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 93:
                switch (flag) {
                    case 1:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 2:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 3:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "3-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 94:
                switch (flag) {
                    case 1:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 2:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 3:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "3-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 95:
                switch (flag) {
                    case 1:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 2:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 3:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "3-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 96:
                switch (flag) {
                    case 1:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 2:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 3:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "3-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 97:
                switch (flag) {
                    case 1:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 2:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 3:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "3-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 98:
                switch (flag) {
                    case 1:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 2:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 3:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "3-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 99:
                switch (flag) {
                    case 1:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 2:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 3:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "3-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 100:
                switch (flag) {
                    case 1:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 2:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "2-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    case 3:
                        document.getElementById("stage").textContent = "STAGE:90-1 ---  ---";
                        document.getElementById("text").textContent = "3-3";
                        document.getElementById("text1").textContent = "1:";
                        document.getElementById("text2").textContent = "2:";
                        document.getElementById("text3").textContent = "3:";
                        break;
                    default:
                        console.log("Not-Stage");
                        break;
                }
                break;
            case 110:
                messegeText = "一休みしてはどうですか";
                document.getElementById("stage").textContent = "エンド：１０ --- ゲームオーバー ---";
                document.getElementById("text").textContent = "ティンクの旅はここで終わり、";
                document.getElementById("text1").textContent = "そして、また始まる。";
                document.getElementById("text2").textContent = "グッドエンドを迎えるまで";
                document.getElementById("text3").textContent = "ティンクの旅は続いていくだろう。";
                stage = 0;
                break;
            default://まだ行動を選択していないのにGOボタンを押してしまったとき
                console.log("Not-Flag");
                break;
        }
        if (flagflagEsc === 0) {
            flag = 0;//入力初期化
        }
        flagflagEsc = 0;
        document.getElementById('flag').textContent = "選択：0";
        parameterfunc();
    }
})();