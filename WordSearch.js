class WordSearch{
    letterGrid;

    constructor(letterGrid) {
        this.letterGrid = this.getLetterGridAsArray(letterGrid);
    }
    
    find(wordsToSearch) {
        let wordsMatched = {};
        
        wordsToSearch.forEach(word => {
            wordsMatched[word] = this.getFirstOccurrensCoordinatesOrUndefined(word);
        });

        
        return wordsMatched;
    }
    
    
    getLetterGridAsArray(letterGrid) {
        return letterGrid.map(row => row.split(""));
    }

    getFirstOccurrensCoordinatesOrUndefined(word) {
        let coordsArray;
        if (coordsArray = this.searchHorizontal(word)) {
            return this.createCoordsOBject(coordsArray);
        }

        if (coordsArray = this.searchVertical(word)) {
            return this.createCoordsOBject(coordsArray);
        }

        return undefined;
    }

    createCoordsOBject(coordsArray) {
        return {
            "start": coordsArray[0],
            "end": coordsArray[1]
        };
    }

    searchHorizontal(wordToSearch) {
        for (let i = 0; i < this.letterGrid.length; i++) {
            let haystackString = "";
            for (let j = 0; j < this.letterGrid[i].length; j++) {
                haystackString += this.letterGrid[i][j];
            }
            
            if (haystackString.includes(wordToSearch)) {
                return [
                    [
                        i,
                        haystackString.indexOf(wordToSearch)
                    ],
                    [
                        i,
                        haystackString.indexOf(wordToSearch) + (wordToSearch.length - 1)
                    ]
                ];
            }

            const reverseWordToSearch = wordToSearch.split("").reverse().join("");
            if (haystackString.includes(reverseWordToSearch)) {
                return [
                    [
                        i,
                        haystackString.indexOf(reverseWordToSearch) + (reverseWordToSearch.length - 1)
                    ],
                    [
                        i,
                        haystackString.indexOf(reverseWordToSearch)
                    ]
                ];
            }
        }

        return false;
    }
    
    searchHorizontalLeftRight(wordToSearch) {
        for (let i = 0; i < this.letterGrid.length; i++) {
            let haystackString = "";
            for (let j = 0; j < this.letterGrid[i].length; j++) {
                haystackString += this.letterGrid[i][j];
            }
            
            if (haystackString.includes(wordToSearch)) {
                return [
                    [
                        i,
                        haystackString.indexOf(wordToSearch)
                    ],
                    [
                        i,
                        haystackString.indexOf(wordToSearch) + (wordToSearch.length - 1)
                    ]
                ];
            }
        }

        return false;
    }
    
    searchHorizontalRightLeft(wordToSearch) {
        for (let i = 0; i < this.letterGrid.length; i++) {
            haystackString = this.letterGrid[i].join("");
            let inversedWord = wordToSearch.split("").reverse().join("");

            if (haystackString.includes(inversedWord)) {
                return [
                    [
                        i,
                        haystackString.indexOf(inversedWord) + (inversedWord.length - 1)
                    ],
                    [
                        i,
                        haystackString.indexOf(inversedWord)
                    ]
                ];
            }
        }
    }
    
    searchVertical(wordToSearch) {
        let coords = [];
        let haystackStringsArray = this.getHaystackStringsAsArrayVertical();

        haystackStringsArray.some( (haystackString, i) => {
            if (haystackString.includes(wordToSearch)) {
                coords = [
                    [
                        haystackString.indexOf(wordToSearch),
                        i
                    ],
                    [
                        haystackString.indexOf(wordToSearch) + wordToSearch.length - 1,
                        i
                    ]
                ];

                return true;
            }

            const reverseWordToSearch = wordToSearch.split("").reverse().join("");
            if (haystackString.includes(reverseWordToSearch)) {
                coords = [
                    [
                        haystackString.indexOf(reverseWordToSearch) + reverseWordToSearch.length - 1,
                        i
                    ],
                    [
                        haystackString.indexOf(reverseWordToSearch),
                        i
                    ]
                ];

                return true;
            }
        });

        return coords;
    }

    getHaystackStringsAsArrayVertical() {
        let haystackStringsArray = [];
        for (let i = 0; i < this.letterGrid.length; i++) {
            for (let j = 0; j < this.letterGrid[i].length; j++) {
                if (typeof haystackStringsArray[j] === "undefined") {
                    haystackStringsArray[j] = this.letterGrid[i][j];
                } else {
                    haystackStringsArray[j] +=  this.letterGrid[i][j];
                }
            }
        }  

        return haystackStringsArray;
    }

    getHaystackStringsAsArrayHorizontal() {
        for (let i = 0; i < this.letterGrid.length; i++) {
            let haystackString = "";
            for (let j = 0; j < this.letterGrid[i].length; j++) {
                haystackString += this.letterGrid[i][j];
            }
        }
    }
}
const myLetterGrid1 = [
    "srword",
    "agoocl",
    "lcbrkl",
    "acerif",
    "hcbrkl",
    "asualc"
];

const myLetterGrid2 = [
    "srdrow",
    "hgoocl",
    "acbrkl",
    "lerifl",
    "acbrkl",
    "abdeol"
];

const wordSearch = new WordSearch(myLetterGrid1);
const wordsToSearch = [
    "word",
    "alah",
    "claus",
    "fire"
];

console.log(wordSearch.letterGrid);
console.log(wordSearch.find(wordsToSearch));
