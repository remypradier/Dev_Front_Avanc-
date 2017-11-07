var Canvas          = document.querySelector('canvas');
var Replay          = document.querySelector('.replay');
var Word            = document.querySelector('.word');
var Title           = document.querySelector('.title');
var keys            = document.querySelectorAll('.key');
var LettersSelected = [];
var WordToFind      = [];
var WordBuild       = [];
var WordsToFind     = [
  'table',
  'chien',
  'porte',
  'anticonstitutionnelement'
];
var RandomNumber;
//var Letter;
var Errors          = 0;
var MaxErrors       = 7;
var Continue        = true;


WordToFind = Randomise(RandomNumber, WordToFind, WordBuild, Word);

document.addEventListener("keydown", function(event){
  if(Continue) {
    document.querySelector('.key_' + event.keyCode).classList.add('selected');
    let Letter = String.fromCharCode(event.keyCode).toLowerCase();
    test(Letter);
  }
})

for(var i = 0; i < keys.length; i++) {
  keys[i].addEventListener('click', function() {
    if(Continue) {
      this.classList.add('selected');
      let Letter = this.innerHTML;
      test(Letter);
    }
  })
}

Replay.addEventListener('click', function() {
  Init();
  BuildCanvas();
  WordToFind = Randomise(RandomNumber, WordToFind, WordBuild, Word)
})

function Init() {
  LettersSelected = [];
  WordToFind      = [];
  WordBuild       = [];
  Continue        = true;
  Errors          = 0;
  Title.innerHTML = "Jeu du pendu";
  ResetKeyBoard();
  DeleteCanvas();
}

function ResetKeyBoard() {
  for(var i = 0; i < keys.length; i++) {
    if(keys[i].classList[2] === 'selected') {
      keys[i].classList.remove('selected');
    }
  }
}

function Randomise(RandomNumber, WordToFind, WordBuild, Word) {
  RandomNumber = Math.floor(Math.random() * WordsToFind.length);
  WordToFind = WordsToFind[RandomNumber].split('');
  MakeWordBuild(Word, WordToFind, WordBuild);
  return WordToFind;

}

function test(Letter) {
    if(CheckLetters(Letter,LettersSelected) === false) {
      Errors = CheckLetterWord(Letter, WordToFind, WordBuild, LettersSelected, Errors);
      if(Errors >= MaxErrors) {
        Title.innerHTML = 'Perdu';

        for(var i = 0; i < WordBuild.length; i++){
          if(WordBuild[i] === '_') {
            WordBuild[i] = "<span class='redletter'>" + WordToFind[i] + "</span>";
            ShowWord(Word, WordBuild);
          }
        }

        Continue = false;
        ShowReplay(Replay);
      } else if (WordBuild.join(' ') == WordToFind.join(' ')) {
        Title.innerHTML = "Bravo";
        Continue = false;
        ShowReplay(Replay);
      }
    }
}

function YouMad(Errors) {
  Errors++;
  MoveCanvas(Errors);
  return Errors;
}

function CheckLetterWord(Letter, WordToFind, WordBuild, LettersSelected, Errors) {
  let Save = WordBuild.slice(0);
  for(var i = 0; i < WordToFind.length; i++) {
    if(WordToFind[i] === Letter) {
      WordBuild[i] = Letter;
    }
  }
  LettersSelected.push(Letter);
  if(Save.join(' ') === WordBuild.join(' ')) {
    Errors = YouMad(Errors);
  }
  ShowWord(Word, WordBuild);
  return Errors;
}

function CheckLetters(Letter, LettersSelected) {
  if(LettersSelected.indexOf(Letter) !== -1) {
    return(true);
  } else {
    return(false);
  }
}

function MakeWordBuild(Word, WordToFind, WordBuild) {
  for(var i = 0; i < WordToFind.length; i++) {
    WordBuild.push('_');
  };
  ShowWord(Word, WordBuild);
}

function ShowWord(Word, WordBuild, ) {
  Word.innerHTML = WordBuild.join(' ');
}

function ShowReplay(Replay, RandomNumber, WordToFind, WordBuild, Word) {
  Replay.style.visibility = 'visible';

}
