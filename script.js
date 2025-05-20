const squares = $(".squares");
const start = $("#start");
const high = $("#high");
const h = $("#get");
const body = $("body");
const p = $("#p");
const doc = $(document);

let highLevel = 0;
let sequence = [];
let mySequence = [];
let i = 0;
let level = 0;
const COLOR = ["blue", "purple", "yellow", "orange"];
start.click(function () {
    starts();
    sequences();
    h.text("Level : " + level);
});

function buttonClick() {
    squares.click(function () {
        const th = $(this);
        const color = $(this).attr("id");
        mySequence.push(color);

        if (mySequence[i] === sequence[i]) {
            playAudio(mySequence[i]);
            th.addClass("right");
            setTimeout(() => {
                th.removeClass("right");
            }, 100);
            i++;
            if (i >= sequence.length) {
                nextLevel();
                console.log(" if right and i>" + level);
                sequences();
                h.text("Level : " + level);
            }
        } else {
            playAudio("wrong");
            th.addClass("wrong");
            body.addClass("bad");
            setTimeout(() => {
                th.removeClass("wrong");
                body.removeClass("bad");
            }, 200);
            if (highLevel < level) {
                highLevel = level;
            }
            starts();
            h.text("Level : " + level);

            high.text("highest Level : " + highLevel);
            setTimeout(() => {
                sequences();
            }, 500);
        }
    });
}

function sequences() {
    const randNum = Math.floor(Math.random() * 4);
    const randColor = COLOR[randNum];
    sequence.push(randColor);
    const q = $(`#${randColor}`);
    q.fadeOut();
    q.fadeIn();
}

function nextLevel() {
    mySequence = [];
    level++;
    i = 0;
}

function starts() {
    sequence = [];
    mySequence = [];
    i = 0;
    level = 0;
    p.text("if something goes wrong click start.");
    squares.off("click");
    buttonClick();
}

function playAudio(color) {
    const a = new Audio(`./sounds/${color}.mp3`);
    a.play();
}

// keypress function
doc.keypress(function (e) {
    const key = e.key.toLowerCase();

    switch (key) {
        case "b":
            keyP("blue");
            break;

        case "p":
            keyP("purple");
            break;

        case "y":
            keyP("yellow");
            break;

        case "o":
            keyP("orange");
            break;
    }
});

function keyP(color) {
    const th = $("#" + color);
    mySequence.push(color);

    if (mySequence[i] === sequence[i]) {
        playAudio(mySequence[i]);
        th.addClass("right");
        setTimeout(() => {
            th.removeClass("right");
        }, 100);
        i++;
        if (i >= sequence.length) {
            nextLevel();
            console.log(" if right and i>" + level);
            sequences();
            h.text("Level : " + level);
        }
    } else {
        playAudio("wrong");
        th.addClass("wrong");
        body.addClass("bad");
        setTimeout(() => {
            th.removeClass("wrong");
            body.removeClass("bad");
        }, 200);
        if (highLevel < level) {
            highLevel = level;
        }
        starts();
        h.text("Level : " + level);

        high.text("highest Level : " + highLevel);
        setTimeout(() => {
            sequences();
        }, 500);
    }
}
