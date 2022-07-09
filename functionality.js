const promptNumbers = [{
    id: 1,
    prompt: 'You suddenly find yourself in a white room.',
    options: [{
         prompt: 'Open Door',
         nextPrompt: 2
        },
        {
        prompt: 'Look in the mirror',
        nextPrompt: 3
        },
        {
        prompt: 'Is that a camera on the wall?',
        nextPrompt: 4
        },
       {  
        prompt: 'Take a look around the bed',
        inventory: {spring: true},
        nextPrompt: 5
        }
    ]},
    {
    id: 2,
    prompt: 'The door is locked.',
    options: [{
        prompt: 'use key',
        nextPrompt: 6
    }]
    }
 ]
 
 // startGame() {
//     inventory = {}
//     newPrompt(1)
// }
// let inventory = {}
let promptId = 1
const newPrompt = () => {
    const promptBox = document.getElementById('prompt');
    const optionArray = document.getElementsByClassName('options');
    Array.from(optionArray).forEach(option => {
        option.style.visibility = "hidden"
    })
    const currentPrompt = promptNumbers.find(p => p.id === promptId) 
    promptBox.textContent = currentPrompt.prompt
    currentPrompt.options.forEach((option, i)=> {
        optionArray[i].textContent = option.prompt
        optionArray[i].addEventListener("click", () => {
            promptId = option.nextPrompt
            newPrompt()
        } )
        optionArray[i].style.visibility  = "visible"
    })
}