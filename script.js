
    

const sleepBtn = document.querySelector("#action-sleep");
const feedBtn = document.querySelector("#action-feed");
const playBtn = document.querySelector("#action-play");
const startBtn = document.querySelector("#action-menu-start-game");
const settingsBtn = document.querySelector("#action-menu-settings");
const settingsBackBtn = document.querySelector("#action-settings-back");
const difHardBtn = document.querySelector("#action-settings-difficulty-hard");
const difNormalBtn = document.querySelector("#action-settings-difficulty-normal");
const difEasyBtn = document.querySelector("#action-settings-difficulty-easy");
const nightModeOffBtn = document.querySelector("#nightmode-off");
const nightModeOnBtn = document.querySelector("#nightmode-on");

const sleepHp = document.querySelector("#sleep-hp");
const hungerHp = document.querySelector("#hunger-hp");
const playHp = document.querySelector("#play-hp");
const scoreBar = document.querySelector("#score");
const maxSleep = 300;
const maxHunger = 300;
const maxPlay = 300;

let day = 20;


function Tamagotchi() {
  this.sleep = maxSleep;
  this.hunger = maxHunger;
  this.play = maxPlay;
}

Tamagotchi.prototype.actionSleep = function() {
    this.sleep+=40 / (day * 2)
};

Tamagotchi.prototype.actionEat = function() {
	this.hunger+=120 / (day * 2)
};

Tamagotchi.prototype.actionPlay = function() {
	this.play+=80 / (day * 2)
};

Tamagotchi.prototype.tick = function() {
    this.sleep--;
    this.hunger-=3;
    this.play-=2;
};

let tmgch = new Tamagotchi();
let sleepHpCount;
let hungerHpCount;
let playHpCount;
let score = 0;

sleepBtn.addEventListener("click", function() {
	tmgch.actionSleep();
});

feedBtn.addEventListener("click", function() {
	tmgch.actionEat();
});

playBtn.addEventListener("click", function() {
	tmgch.actionPlay();
});

startBtn.addEventListener("click", function() {
	startGame();
});

settingsBtn.addEventListener("click", function() {
	settingsMenu();
});

difHardBtn.addEventListener("click", function() {
	day = 5;
	document.querySelector("#difSet").innerHTML = "Hard";
});

difNormalBtn.addEventListener("click", function() {
	day = 20;
	document.querySelector("#difSet").innerHTML = "Normal";
});

difEasyBtn.addEventListener("click", function() {
	day = 40;
	document.querySelector("#difSet").innerHTML = "Easy";
});

settingsBackBtn.addEventListener("click", function() {
	MainMenu();
});

nightModeOffBtn.addEventListener("click", function() {
	nightModeOff();
});

nightModeOnBtn.addEventListener("click", function() {
	nightModeOn();
});

function nightModeOn() {
	document.querySelector('body').classList.add("nightmode-on");
	document.querySelector('#nightmode').innerHTML = "on";
}

function nightModeOff() {
	document.querySelector('body').classList.remove("nightmode-on");
	document.querySelector('#nightmode').innerHTML = "off";
}

document.querySelector(".game-screen").classList.toggle("hide");
document.querySelector(".menu-screen-settings").classList.toggle("hide");

function MainMenu() {
	document.querySelector(".menu-screen-settings").classList.toggle("hide");
	document.querySelector(".main-menu-screen").classList.toggle("hide");
}

function settingsMenu() {
	document.querySelector(".main-menu-screen").classList.toggle("hide");
	document.querySelector(".menu-screen-settings").classList.toggle("hide");
}

function startGame() {
    document.querySelector(".game-screen").classList.toggle("hide");
    document.querySelector(".main-menu-screen").classList.toggle("hide");
    var tamagotchiName = prompt("Please, enter a name of your tamagotchi:", "");
	document.querySelector("#name").innerHTML = tamagotchiName;
	if (tamagotchiName == null || tamagotchiName.replace(/\s/g, '') == "") {
		tamagotchiName = "Tamagotchi";
		document.querySelector("#name").innerHTML = tamagotchiName;
}
    core();
    let coreUpdate = setInterval(core, 100 * day);
    function core() {

        sleepHpCount = (tmgch.sleep / maxSleep * 100).toFixed(2);
        hungerHpCount = (tmgch.hunger / maxHunger * 100).toFixed(2);
        playHpCount = (tmgch.play / maxPlay * 100).toFixed(2);

        
        score++;
        scoreBar.innerHTML = score;


        if ((playHpCount <= 0) || (sleepHpCount <= 0) || (hungerHpCount <= 0)) {
            playHpCount = 0;
            sleepHpCount = 0;
            hungerHpCount = 0;
            clearInterval(coreUpdate);
            alert('Your score: ' + score + '\n effect-Sad.innerHTML');
        }

        if (tmgch.sleep >= (maxSleep + (maxSleep / 100 * 20))) {
            tmgch.sleep = maxSleep + (maxSleep / 100 * 20);
        }

        if (tmgch.hunger >= (maxHunger + (maxHunger / 100 * 20))) {
            tmgch.hunger = maxHunger + (maxHunger / 100 * 20);
        }

        if (tmgch.play >= (maxPlay + (maxPlay / 100 * 20))) {
            tmgch.play = maxPlay + (maxPlay / 100 * 20);
        }

        if ((tmgch.sleep / maxSleep * 100) > 100) {
            sleepHpCount = 100;
        }
        if ((tmgch.hunger / maxHunger * 100) > 100) {
            hungerHpCount = 100;
        }
        if ((tmgch.play / maxPlay * 100) > 100) {
            playHpCount = 100;
        }

        sleepHp.innerHTML = sleepHpCount;
        hungerHp.innerHTML = hungerHpCount;
        playHp.innerHTML = playHpCount;

        tmgch.tick();
        const effectSad = document.getElementById("effect-Sad");
        const effectHappy = document.getElementById("effect-Happy");
        const effectAngry = document.getElementById("effect-Angry");
        if (sleepHpCount <= 10) {
            document.getElementById("effect-Dead").src = "dead.gif";
        }
        else if (sleepHpCount <= 80) {
            document.getElementById("effect-Sad").src = "sad.gif";
        }
        else if (sleepHpCount > 80) {
            document.getElementById("effect-Happy").src = "happy.gif";
    
        }
    
        if (hungerHp <= 10) {
            document.getElementById("effect-Dead").src = "dead.gif";
        }
        else if (hungerHp <= 80) {
            document.getElementById("effect-Angry").src = "1.gif";
        }
        else if (hungerHp > 80) {
            document.getElementById("effect-Happy").src = "happy.gif";
    
        }

        if (playHpCount <= 10) {
            document.getElementById("effect-Dead").src = "dead.gif";
        }
        else if (playHpCount <= 80) {
            document.getElementById("effect-Angry").scr = "1.gif";
        }
        else if (playHpCount > 80) {
            document.getElementById("effect-Happy").src = "happy.gif";
    
        }
    

    }
}
