var Canvas          = document.querySelector('canvas');

(function (Canvas) {
  var Replay          = document.querySelector('.replay');
  var Word            = document.querySelector('.word');
  var Title           = document.querySelector('.title');
  var keys            = document.querySelectorAll('.key');
  var LettersSelected = [];
  var WordToFind      = [];
  var WordBuild       = [];
  var WordsToFind     = words;
  var RandomNumber    = 0;
  var Errors          = 0;
  var MaxErrors       = 7;
  var Continue        = true;

  Keyboard();
  WordToFind = Randomise(RandomNumber, WordToFind, WordBuild, Word);

  document.addEventListener("keydown", function(event){

    if(Continue && event.keyCode > 64 &&  event.keyCode < 91) {
      document.querySelector('.key_' + event.keyCode).classList.add('selected');
      let Letter = String.fromCharCode(event.keyCode).toLowerCase();
      Test(Letter);
    } else if(event.keyCode === 13) {
      Init();
    }
  })

  for(var i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', function() {
      if(Continue) {
        this.classList.add('selected');
        let Letter = this.innerHTML;
        Test(Letter);
      }
    })
  }

  Replay.addEventListener('click', function() {
    Init();
  })

  function Init() {
    LettersSelected = [];
    WordToFind      = [];
    WordBuild       = [];
    Continue        = true;
    Errors          = 0;
    Title.innerHTML = "Jeu du pendu";
    Title.classList = "title";
    Keyboard();
    DeleteCanvas();
    BuildCanvas();
    WordToFind = Randomise(RandomNumber, WordToFind, WordBuild, Word)
  }

  function Randomise(RandomNumber, WordToFind, WordBuild, Word) {
    RandomNumber = Math.floor(Math.random() * WordsToFind.length);
    WordToFind = WordsToFind[RandomNumber].split('');
    MakeWordBuild(Word, WordToFind, WordBuild);
    return WordToFind;

  }

  function Test(Letter) {
      if(CheckLetters(Letter,LettersSelected) === false) {
        Errors = CheckLetterWord(Letter, WordToFind, WordBuild, LettersSelected, Errors);
        if(Errors >= MaxErrors) {
          Title.innerHTML = 'Perdu';
          Title.classList.add('redletter');

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
          Title.classList.add('greenletter');
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
      //http://aidenet.eu/grammaire01d.html
      switch (Letter) {
        case 'a':
            switch (WordToFind[i]) {
              case 'a': WordBuild[i] = 'a'; break;
              case 'à': WordBuild[i] = 'à'; break;
              case 'â': WordBuild[i] = 'â'; break;
            }
        break;
        case 'e':
            switch (WordToFind[i]) {
              case 'e': WordBuild[i] = 'e'; break;
              case 'é': WordBuild[i] = 'é'; break;
              case 'è': WordBuild[i] = 'è'; break;
              case 'ê': WordBuild[i] = 'ê'; break;
              case 'ë': WordBuild[i] = 'ë'; break;
            }
        break;
        case 'i':
            switch (WordToFind[i]) {
              case 'i': WordBuild[i] = 'i'; break;
              case 'î': WordBuild[i] = 'î'; break;
              case 'ï': WordBuild[i] = 'ï'; break;
            }
        break;
        case 'o':
            switch (WordToFind[i]) {
              case 'o': WordBuild[i] = 'o'; break;
              case 'ô': WordBuild[i] = 'ô'; break;
            }
        break;
        case 'u':
            switch (WordToFind[i]) {
              case 'u': WordBuild[i] = 'u'; break;
              case 'ù': WordBuild[i] = 'ù'; break;
              case 'û': WordBuild[i] = 'û'; break;
              case 'ü': WordBuild[i] = 'ü'; break;
            }
        break;
        case 'c':
            switch (WordToFind[i]) {
              case 'c': WordBuild[i] = 'c'; break;
              case 'ç': WordBuild[i] = 'ç'; break;
            }
        break;
        case WordToFind[i]: WordBuild[i] = Letter; break;
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
      if(WordToFind[i] === '-') {
        WordBuild.push('-');
      } else {
        WordBuild.push('_');
      }
    };
    ShowWord(Word, WordBuild);
  }

  function Keyboard() {
    let Keyboard = document.querySelector('.keyboard');
    Keyboard.innerHTML = '';
    for (var i = 65; i < 91; i++) {
      Keyboard.innerHTML += '<li class="key key_' + i + '">' +
        String.fromCharCode(i) + '</li>'
    }
  }

  function ShowWord(Word, WordBuild, ) {
    Word.innerHTML = WordBuild.join(' ');
  }

  function ShowReplay(Replay, RandomNumber, WordToFind, WordBuild, Word) {
    Replay.style.visibility = 'visible';

  }

})();
