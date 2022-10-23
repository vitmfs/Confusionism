function test():void {
    console.log('Hello World');
}

function replaceVowels( word: string, charToReplaceVowels: string ): string {

    return word.length <= 2 ? word : word.replace(/a|e|i|o|u/gi, charToReplaceVowels);
}

function reverseWord( wordToReverse: string ): string {
    let lastCharacter= '';
    if (pontuationCharacterAtTheEnd( wordToReverse )) {
        lastCharacter = wordToReverse[wordToReverse.length-1];
        wordToReverse = wordToReverse.substring(0, wordToReverse.length-1);
    }

    return wordToReverse.split('').reverse().join('') + lastCharacter;
}

const pontuationCharacters:string = '.!?,';

function pontuationCharacterAtTheEnd( text: string ):boolean {
    return pontuationCharacters.includes(
        text[text.length-1]
    );
}

function pontuationCharacterAtTheStart( text: string ): boolean {
    return pontuationCharacters.includes(text[0]);
}

function shuffleWord( word: string ): string {

    let lastCharacter = '';

    if (pontuationCharacterAtTheEnd( word )) {
        lastCharacter = word[word.length-1];
        word = word.substring(0, word.length-1);
    }

    const originalWord  = word;
    let shuffledWord    = word.split('').sort(() => Math.random() - 0.5).join('');

    shuffledWord += lastCharacter;
    return shuffledWord;
}

function lettersToNumbers( upperCasedWord: string ): string {

    let changedWord = upperCasedWord;
    changedWord = 
        changedWord
        .replace(/A|Á|À|Â|Ã/gi, '4')
        .replace(/E|É|È/gi, '3')
        .replace(/I|Í|Ì/gi, '1')
        .replace(/O|Ó|Ò/gi, '0')
        .replace(/S/gi, '5')
        .replace(/T/gi, '7');
    return changedWord;
}

function asciiLettersAndSpaceCharsOnly(stringToEncript: string): string {
    let onlyAsciiLettersMessage = '';

    onlyAsciiLettersMessage =
        stringToEncript
        .replace(/á|à|â|ã/gi, 'a')
        .replace(/é|è/gi, 'e')
        .replace(/í|ì/gi, 'i')
        .replace(/ó|ò|ô/gi, 'o')
        .replace(/ú/gi, 'u')
        .replace(/ç/gi, 'c')
        .replace(/-/gi, ' ')
        .replace(/[^A-Za-z]/gi, ' ')
        .trim();

    return onlyAsciiLettersMessage;
}

function translateLetterToNATOAlphabet( letter: string ): string {

    const translationObject = {
        a: 'Alpha',
        b: 'Bravo',
        c: 'Charlie',
        d: 'Delta',
        e: 'Echo',
        f: 'Foxtrot',
        g: 'Golf',
        h: 'Hotel',
        i: 'India',
        j: 'Juliet',
        k: 'Kilo',
        l: 'Lima',
        m: 'Mike',
        n: 'November',
        o: 'Oscar',
        p: 'Papa',
        q: 'Quebec	',
        r: 'Romeo',
        s: 'Sierra',
        t: 'Tango',
        u: 'Uniform',
        v: 'Victor',
        w: 'Whiskey',
        x: 'X-Ray',
        y: 'Yankee',
        z: 'Zulu'
    };

    return translationObject[letter.toLowerCase()];
}

function translateLetterToNATOAlphabetFullText( originalText: string): string {
    const simplefiedText = asciiLettersAndSpaceCharsOnly(originalText);

    let fullText = "";
    let words = simplefiedText.split(" ");
    const wordsLength  = words.length;

    for (let i = 0; i < wordsLength; i++) {
        const eachWord = words[i];
        eachWord.split("").forEach( (letter) => {
            fullText += translateLetterToNATOAlphabet(letter) + "\n";
        });

        fullText += "\n";
    }

    return fullText;
}

function asciiLettersWordToLetterPositionsInAlphabeth( word: string): string {
    const alphabeth = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const wordLength = word.length;

    let postionsStr = "";

    for (let i = 0; i < wordLength; i++ ) {
        postionsStr += alphabeth.indexOf(word[i]) + 1;

        if (i < (wordLength-1) ) {
            postionsStr += "-";
        }


    }

    return postionsStr;
}

function asciiLettersWordToLetterPositionsInAlphabethFullText( originalText: string): string {

    const key = "A --> 1\nB --> 2\n   ...\nZ --> 26";
    const simplefiedText = asciiLettersAndSpaceCharsOnly(originalText);

    let fullText = key + "\n";

    simplefiedText.split(" ").forEach( (word) => {
        fullText += asciiLettersWordToLetterPositionsInAlphabeth(word) + "\n"
    });


    return fullText;
}

function randomIntegerBetweenXandY(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function wordToWordPuzzleRow( asciiLettersWord: string, numberOfLettersInTheRow: number): string {
    const alphabeth = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lastIndexWereWordCanStart = numberOfLettersInTheRow - asciiLettersWord.length;
    const numberOfPostionsToFillInRow = lastIndexWereWordCanStart;
    const numberOfLettersBeforeWord = randomIntegerBetweenXandY(0, numberOfPostionsToFillInRow);
    const numberOfLettersAfterWord = numberOfPostionsToFillInRow - numberOfLettersBeforeWord;

    let wordWithLettersBeforeAndAfter = "";
    for (let i = 1; i <= numberOfLettersBeforeWord; i++ ) {
        const indexOfRandomLetter = randomIntegerBetweenXandY(0, 25);
        wordWithLettersBeforeAndAfter += alphabeth[indexOfRandomLetter];
    }

    wordWithLettersBeforeAndAfter += asciiLettersWord;

    for (let i = 1; i <= numberOfLettersAfterWord; i++ ) {
        const indexOfRandomLetter = randomIntegerBetweenXandY(0, 25);
        wordWithLettersBeforeAndAfter += alphabeth[indexOfRandomLetter];
    }


    return wordWithLettersBeforeAndAfter;
}

function textToWordPuzzle(originalText: string, numberOfPaddingLetters: number): string {

    const simplefiedText = asciiLettersAndSpaceCharsOnly(originalText);
    const words = simplefiedText.split(" ");
    const lengthOfBiggestWord = Math.max(...words.map((word) => word.length));

    let wordPuzzleFullText = "";
    const lengthOfRow = lengthOfBiggestWord + numberOfPaddingLetters;

    words.forEach((word) => {
        wordPuzzleFullText += wordToWordPuzzleRow(word, lengthOfRow) + "\n"
    });


    return wordPuzzleFullText;
}


function initializeCellPhoneStr(): string {

    const cellPhoneStr = `
<pre>
<code>
 ________________
|                |
|                |
|                |
|                |
|                |
|    SMS 4 U     |
|                |
|                |
|                |
|                |
|                |
 ________________ 
|1    |2abc|3def |
|4ghi |5jkl|6mno |
|7pqrs|8tuv|9wxyz|
|*    |0   |#    |
 ________________
</code>
</pre>
<pre id="encrypted"></pre>`;

    return cellPhoneStr;
}


function retroCellphoneEncription( stringToEncript: string ): string {

    const letters = 'abcdefghijklmnopqrstuvwxyz ';

    const abc2  = '2abc';
    const def3  = '3def';
    const ghi4  = '4ghi';
    const jkl5  = '5jkl';
    const mno6  = '6mno';
    const pqrs7 = '7pqrs';
    const tuv8  = '8tuv';
    const wxyz9 = '9wxyz';
    const _0    = '0 ';

    let encriptedString = "";

    stringToEncript.toLowerCase().split('').forEach( (char) => {
        let key = ''
        let numberOfKeyPresses = 0;
        if ( letters.includes(char) ) {
            if (abc2.includes(char) ) { key = abc2[0]; numberOfKeyPresses = abc2.indexOf(char) }
            if (def3.includes(char) ) { key = def3[0]; numberOfKeyPresses = def3.indexOf(char) }
            if (ghi4.includes(char) ) { key = ghi4[0]; numberOfKeyPresses = ghi4.indexOf(char) }
            if (jkl5.includes(char) ) { key = jkl5[0]; numberOfKeyPresses = jkl5.indexOf(char) }
            if (mno6.includes(char) ) { key = mno6[0]; numberOfKeyPresses = mno6.indexOf(char) }
            if (pqrs7.includes(char)) { key = pqrs7[0]; numberOfKeyPresses = pqrs7.indexOf(char) }
            if (tuv8.includes(char) ) { key = tuv8[0]; numberOfKeyPresses = tuv8.indexOf(char) }
            if (wxyz9.includes(char)) { key = wxyz9[0]; numberOfKeyPresses = wxyz9.indexOf(char) }
        }
        

        for (let i = 1; i <= numberOfKeyPresses; i++) {
            encriptedString += key
        }

        if (char !== ' ') {
            encriptedString += '-';
        } else {
            encriptedString = encriptedString.substring(0, encriptedString.length-1);
            encriptedString += ' ';
        }
        

    });

    encriptedString = encriptedString.substring(0, encriptedString.length-1);

    return encriptedString;

}


// VOWELS TO AIX ENDER INIX OVER UFUX
function aixToUfux( word:string ): string {

    let changedWord = '';

    for ( let i = 0; i < word.length; i++) {
        switch(word[i]) {

            case 'a':
            case 'á':
            case 'à':
            case 'â':
            case 'ã':
            changedWord += 'aix';
                break;
            case 'A':
            case 'Á':
            case 'À':
            case 'Â':
            case 'Ã':
            changedWord += 'AIX';
                break;
            
            case 'e':
            case 'é':
            case 'è':
            changedWord += 'ender';
                break;
            case 'E':
            case 'É':
            case 'È':
            changedWord += 'ENDER';
                break;
            
            case 'i':
            case 'í':
            case 'ì':
            changedWord += 'inix';
                break;
            case 'I':
            case 'Í':
            case 'Ì':
            changedWord += 'INIX';
                break;
            
            case 'o':
            case 'ó':
            case 'ò':
            changedWord += 'over';
                break;
            case 'O':
            case 'Ó':
            case 'Ò':
            changedWord += 'OVER';
                break;
            
            case 'u':
            changedWord += 'ufux';
                break;
            case 'U':
            changedWord += 'UFUX';
                break;
            
            default:
            changedWord += word[i];
                break;
        }
    }

    return changedWord;
}

function returnToDefaultVogals( word ) {

    let changedWord = word;
    changedWord = 
        changedWord
        .replace(/AIX/gi, 'A')
        .replace(/aix/gi, 'a')

        .replace(/ENDER/gi, 'E')
        .replace(/ender/gi, 'e')

        .replace(/INIX/gi, 'I')
        .replace(/inix/gi, 'i')

        .replace(/OVER/gi, 'O')
        .replace(/over/gi, 'o')
        
        .replace(/UFUX/gi, 'U')
        .replace(/ufux/gi, 'u')

    return changedWord;
}


test();
