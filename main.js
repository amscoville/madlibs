$(document).ready(function(){
    $(document).on('keyup', pressEnter);
    $('.radio').on('change', onRadioChange);
});

var isFirstRadioBtn = true;

function clickGenerate() {
    var currStoryId = getCurrStoryId();
    showStory(currStoryId);
    replaceWords(currStoryId);
}

function getCurrStoryId(){
    var halloweenChecked = document.getElementById('halloween').checked;
    var campingChecked = document.getElementById('camping').checked;
    var awkwardDateChecked = document.getElementById('awkward-date').checked;
    if(halloweenChecked) return 'halloween-story';
    else if(campingChecked) return 'camping-story';
    else if(awkwardDateChecked) return 'awkward-date-story';
    else alert('you done goofed!');
}

function showStory(storyId){
    $('.story').removeClass('show');
    $('#' + storyId).addClass('show');
}

function getInputOfType(wordType) {
    return document.getElementById(wordType).value.split(',');
}

function replaceWords(storyId) {
    replaceWordsOfType('noun', storyId, lbackupNouns);
    replaceWordsOfType('adjective',storyId,backupAdjectives);
    replaceWordsOfType('verb',storyId,backupVerbs);
    replaceWordsOfType('adverb',storyId,backupAdverbs); 
}

function replaceWordsOfType(wordType,storyId,backupWords){
    var story = document.getElementById(storyId);
    var wordSpots = $('#' + storyId + ' span.' + wordType);
    var words = getInputOfType(wordType + 's');
    if(words[0] === '') {
        words[0] = getRandWord(backupWords);
    }
    while(words.length < 4){
        var newWord = getRandWord(backupWords);
        words.push(newWord);
    }
    for(var i = 0; i < wordSpots.length; i++){
        wordSpots[i].innerText = words[i];
    }
}

function getRandWord(array) {
    return array[Math.floor(Math.random()*array.length)];
}

function pressEnter() {
    if(event.keyCode === 13){
        clickGenerate();
    }
}

function onRadioChange(){
    if(isFirstRadioBtn) {
        isFirstRadioBtn = false;
    }
    else {
        clickGenerate();
    }
}