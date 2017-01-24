﻿(function () {
    var imagePath = '../../MiniGames/RhymingMatch/images/';
    var soundPath = '../../MiniGames/Rhymingmatch/sounds/';
    var targetIndex, word1Index, word2Index;   //indicies for word cards

    //sets of rhyming words and corresponding sounds
    var wordsSet1 = [imagePath + "ball.png", imagePath + "bat.png", imagePath + "bed.png", imagePath + "chick.png", imagePath + "dish.png",
        imagePath + "fox.png", imagePath + "frog.png", imagePath + "house.png", imagePath + "rock.png", imagePath + "rose.png"];
    var wordsSet2 = [imagePath + "call.png", imagePath + "cat.png", imagePath + "red.png", imagePath + "lick.png", imagePath + "fish.png",
        imagePath + "box.png", imagePath + "log.png", imagePath + "mouse.png", imagePath + "sock.png", imagePath + "toes.png"];

    var soundsSet1 = [soundPath + "ball_recording.mp3", soundPath + "bat_recording.mp3", soundPath + "bed_recording.mp3",
        soundPath + "chick_recording.mp3", soundPath + "dish_recording.mp3", soundPath + "fox_recording.mp3", soundPath + "frog_recording.mp3",
        soundPath + "house_recording.mp3", soundPath + "rock_recording.mp3", soundPath + "rose_recording.mp3"];
    var soundsSet2 = [soundPath + "call_recording.mp3", soundPath + "cat_recording.mp3", soundPath + "red_recording.mp3",
        soundPath + "lick_recording.mp3", soundPath + "fish_recording.mp3", soundPath + "box_recording.mp3", soundPath + "log_recording.mp3",
        soundPath + "mouse_recording.mp3", soundPath + "sock_recording.mp3", soundPath + "toes_recording.mp3"];

    //set correct margin for div and div styling
    document.getElementById('BlocksGame').style.marginLeft = '-5%';
    document.getElementById('BlocksGame').style.backgroundColor = '#BF5FFF'
    document.getElementById('BlocksGame').style.width = '88%';
    document.getElementById('BlocksGame').style.marginLeft = '1%';

    //create div for target word to rhyme with
    var targetRhyme = document.createElement('div');
    targetRhyme.setAttribute('class', 'topDivs')
    targetRhyme.style.marginLeft = '15%';
    document.getElementById('BlocksGame').appendChild(targetRhyme);

    //create div for matching rhyming word
    var matchingRhyme = document.createElement('div');
    matchingRhyme.setAttribute('class', 'topDivs')
    matchingRhyme.style.marginLeft = '60%';
    matchingRhyme.style.backgroundColor = '#6B238E';
    document.getElementById('BlocksGame').appendChild(matchingRhyme);

    //style target and matching divs
    var top = document.getElementsByClassName('topDivs');
    for (var i = 0; i < top.length; i++) {
        top[i].style.position = 'absolute';
        top[i].style.marginTop = '1%';
        top[i].style.width = '25%';
        top[i].style.height = '40%';
        top[i].style.zIndex = 2;
        top[i].style.border = "thick solid #000"
    }

    //create div for rhyming word option 1
    var card1 = document.createElement('div');
    card1.setAttribute('class', 'card');
    document.getElementById('BlocksGame').appendChild(card1);

    //create div for rhyming word option 2
    var card2 = document.createElement('div');
    card2.setAttribute('class', 'card');
    document.getElementById('BlocksGame').appendChild(card2);

    //create div for rhyming word option 3
    var card3 = document.createElement('div');
    card3.setAttribute('class', 'card');
    document.getElementById('BlocksGame').appendChild(card3);

    //style divs that will contain rhyming word options
    var cards = document.getElementsByClassName('card');
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.position = 'absolute';
        cards[i].style.marginTop = '30%';
        cards[i].style.width = '25%';
        cards[i].style.height = '40%';
        cards[i].style.zIndex = 2;
        cards[i].style.border = "thick solid #000"
    }

    //create, style, and add target image to target div
    var targetImage = document.createElement('img');
    targetImage.style.height = '100%';
    targetImage.style.width = '100%';
    targetRhyme.appendChild(targetImage);

    //create, style, and add first word option to div and set draggable to true
    var card1Image = document.createElement('img');
    card1Image.setAttribute('id', 'matchingImg');
    card1Image.style.height = '100%';
    card1Image.style.width = '100%';
    card1Image.setAttribute('draggable', true);
    card1.appendChild(card1Image);

    //create, style, and add second word option to div and set draggable to true
    var card2Image = document.createElement('img');
    card2Image.setAttribute('id', 'draggableImg2');
    card2Image.style.height = '100%';
    card2Image.style.width = '100%';
    card2Image.setAttribute('draggable', true);
    card2.appendChild(card2Image);

    //create, style, and add third word option to div and set draggable to true
    var card3Image = document.createElement('img');
    card3Image.setAttribute('id', 'draggableImg3');
    card3Image.style.height = '100%';
    card3Image.style.width = '100%';
    card3Image.setAttribute('draggable', true);

    var tryAgain = new Audio(); //try again audio for incorrect matching choice
    tryAgain.src = soundPath + "tryAgain_recording.mp3";
    var correct = new Audio();  //praise audio for correct matching choice
    correct.src = soundPath + "praise_recording.mp3";

    //handle dropping action
    matchingRhyme.ondragover = function allowDrop(ev) {
        ev.preventDefault();
    }
    //handle dragging action for non-matching word card 1
    card1Image.ondragstart = function drag(ev) {
        tryAgain.play();
    }
    //handle dragging action for non-matching word card 2
    card2Image.ondragstart = function drag(ev) {
        tryAgain.play();
    }
    //handle dragging action for matching word card
    card3Image.ondragstart = function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
        correct.play();
    }
    //handle dropping action
    matchingRhyme.ondrop = function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

    function InitGame() {
        card3.appendChild(card3Image);

        targetIndex = Math.floor((Math.random() * wordsSet1.length)); //randomly choose target word
        word1Index = Math.floor((Math.random() * wordsSet1.length)); //randomly choose word1 index
        while (word1Index == targetIndex)  //choose again if same as another index
            word1Index = Math.floor((Math.random() * wordsSet1.length)); //randomly choose word1 index
        word2Index = Math.floor((Math.random() * wordsSet1.length)); //randomly choose word2 index
        while (word2Index == targetIndex || word2Index == word1Index)  //choose again if same as another index
            word2Index = Math.floor((Math.random() * wordsSet1.length)); //randomly choose word2 index

        targetImage.src = wordsSet1[targetIndex];   //target card
        card3Image.src = wordsSet2[targetIndex];    //matching card
        card1Image.src = wordsSet1[word1Index];     //incorrect matching card 1
        card2Image.src = wordsSet1[word2Index];     //incorrect matching card 2

        var cardCoord = ['5%', '37.5%', '70%']; //coordinate for word cards at bottom of screen

        var index3 = Math.floor((Math.random() * cardCoord.length));
        card3.style.marginLeft = cardCoord[index3];  //randomly set location of target card
        var index2 = Math.floor((Math.random() * cardCoord.length));
        while (index2 == index3)
            index2 = Math.floor((Math.random() * cardCoord.length));
        card2.style.marginLeft = cardCoord[index2]; //randomly set location of first word card
        var index1 = Math.floor((Math.random() * cardCoord.length));
        while (index1 == index2 || index1 == index3)
            index1 = Math.floor((Math.random() * cardCoord.length));
        card1.style.marginLeft = cardCoord[index1]; //randomly set location of second word card

        GameIntro();    //call function to play directions
    }
    function GameIntro() {
        var InstructionsPart1 = new Audio();
        InstructionsPart1.src = soundPath + "audio_instructionsPart1.mp3";
        var InstructionsPart2 = new Audio();
        InstructionsPart2.src = soundsSet1[targetIndex];    //play target rhyming word
        var InstructionsPart3 = new Audio();
        InstructionsPart3.src = soundPath + "audio_instructionsPart2.mp3";
        InstructionsPart1.addEventListener('ended', function () {
            InstructionsPart2.play()
        });
        InstructionsPart2.addEventListener('ended', function () {
            InstructionsPart3.play()
        });
        InstructionsPart1.play();
    }

    correct.addEventListener('ended', function () {
        InitGame();
    });

    InitGame();
}());