const promptNumbers = [{
    id: 1,
    prompt: 'YOU SUDDENLY FIND YOURSELF IN A WHITE ROOM.',
    options: [{
         prompt: 'START GAME',
         nextPrompt: 2
    }]},
    {
    id: 2,
    prompt: 'you suddenly find yourself in a white room.',
    options: [{
        prompt: 'open door',
        nextPrompt: 3,
        },
        {
        prompt: 'look in the mirror',
        nextPrompt: 4
        },
        {  
        prompt: 'look under the bed',
        nextPrompt: 5
        }
    ]},
    {
    id: 3,
    prompt: 'the door is locked.',
    options: [{
        prompt: 'take another look around the room',
        nextPrompt: 2
        },
        {
        prompt: 'pick the lock',
        requiredInventory: (currentInventory) => currentInventory.spring,
        addInventory: { spring: false },
        nextPrompt: 6
        }]
    },
    {
    id: 4,
    prompt: "you barely recognize the person staring back at you. you know it's you though.",
    options: [{
        prompt: "that's enough of that",
        nextPrompt: 2
    }]
    },
    {
    id: 5,
    prompt: 'there sure is a lot of dust.',
    options: [{
        prompt: 'pull loose spring',
        addInventory: { spring: true },
        // inventoryItems: [{
        //     url: 'https://static.parade.com/wp-content/uploads/2021/07/Taiyaki-Ice-Cream-e1627501361918.jpg',
        //     left: 500,
        //     bottom: 30
        // }],
        nextPrompt: 2
    }]
    },
    {
    id: 6,
    prompt: "you exit into a bright hallway.",
    options: [{
        prompt: "to your right there's an elevator",
        nextPrompt: 7
        },
        {
        prompt: "to your left is a cooridor",
        nextPrompt: 8
        }]
    },
    {
    id: 7,
    prompt: "↑↓",
    options: [{
        prompt: '1',
        nextPrompt: 9
        },
        {
        prompt: '2',
        nextPrompt: 10
        },
        {
        prompt: '3',
        nextPrompt: 11
        },
        {
        prompt: "there's a keypad",
        nextPrompt: 12
        },
        {
        prompt: 'go back',
        nextPrompt:6
        }]
    },
    {
    id: 8,
    prompt: "you've reached a fork in the hallway. there is a side table with a vase of dead flowers in front of you.",
    options: [{
        prompt: 'turn left',
        nextPrompt: 13
        },
        {
        prompt: 'approach the table',
        nextPrompt: 14
        },
        {
        prompt: 'turn right',
        nextPrompt: 15
        },
        {
        prompt: 'go back',
        nextPrompt:6
        }]
    },
    {
    id: 9,
    prompt: "you're on this floor.",
    options: [{
        prompt: "going up",
        nextPrompt: 7
        }]  
    },
    {
    id: 13,
    prompt: "the hallway goes on forever.",
    options: [{
        prompt: "and ever...",
        nextPrompt: 16
        }]
    },
    {
    id: 16,
    prompt: 'and ever...',
    options: [{
        prompt: "and ever...",
        nextPrompt: 1
    }

    ]
    }
    ]

let inventory = {}

function startGame() {
    inventory = {}
    newPrompt(1)
}

let promptId = 1

const newPrompt = () => {
    const promptBox = document.getElementById('prompt');
    const optionArray = document.getElementsByClassName('options');
    const inventoryPhotos = document.getElementsByClassName('inventoryItem')
    Array.from(optionArray).forEach(option => {
        option.style.visibility = "hidden"
    });
    Array.from(inventoryPhotos).forEach(item => {
        item.style.visibility = "hidden"
    });
    const currentPrompt = promptNumbers.find(p => p.id === promptId) 
    promptBox.textContent = currentPrompt.prompt
    currentPrompt.options.forEach((option, i)=> {
        if (checkInventory(option)){
            optionArray[i].textContent = option.prompt
            optionArray[i].addEventListener("click", () => {
                promptId = option.nextPrompt
                newPrompt()
                inventory = Object.assign(inventory, option.addInventory)
            } )
        }
        if (option.requiredInventory == null || option.requiredInventory(inventory)) {
            optionArray[i].style.visibility  = "visible"
        } else {
            optionArray[i].style.visibility  = "hidden"
        }
    })
}

function checkInventory(option){
    return option.requiredInventory == null || option.requiredInventory(inventory)
}
function showInventory(option){
    if (option.requiredInventory == true) {
        item.style.visibility="visible"
    }
}

// https://codepen.io/abikuk/pen/pGzJGy
var track = document.getElementById('track');

var controlBtn = document.getElementById('play-pause');

function playPause() {
    if (track.paused) {
        track.play();
        controlBtn.className = "pause";
    } else { 
        track.pause();
        controlBtn.className = "play";
    }
}

controlBtn.addEventListener("click", playPause);
track.addEventListener("ended", function() {
  controlBtn.className = "play";
});

startGame()