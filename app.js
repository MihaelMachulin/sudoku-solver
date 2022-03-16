const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const solutionDisplay = document.querySelector('#solution')
const squares = 81
let submission = []
let j = false, k

// https://codesandbox.io/s/hopeful-agnesi-8qvogt?file=/src/index.js

console.log(10 % 3)

for (let i = 0; i < squares; i++) { // Make a gameboard
  let inputElement = document.createElement('input')
  const propsObject = {'type': 'number', 'min': 1, 'max': 9}
  inputElement = Object.assign(inputElement, propsObject)
  puzzleBoard.appendChild(inputElement)
  if (
       (  ((i % 9 <= 2) || (i % 9 >= 6)) && (i < 27 || i > 53)  ) ||
       (  ((i % 9 <= 5) && (i % 9 >= 3)) && (i > 26 && i < 54)  )
    ) { 
    inputElement.classList.add('odd-section');
  }

}

const joinValues = () => {
  submission = []
  const inputs = document.querySelectorAll('input')
  let emptySpaces = 0
  inputs.forEach(input => {
    if (input.value) {
        submission.push(emptySpaces != 0 ? `x${emptySpaces}x` + input.value : input.value)
        emptySpaces = 0
    } else { emptySpaces++ }
  })
  submission.push(`x${emptySpaces}x`)
  console.log(submission)
}

const populateValues = (isSolbable, solution) => {
	const inputs = document.querySelectorAll('input')
	if (isSolbable && solution){
		inputs.forEach((input, i) => {
			input.value = solution[i]
		})	
		solutionDisplay.innerHTML = 'Here is an answer!'
	} else {
		solutionDisplay.innerHTML = 'This is not solvable!'
	}

}


const solve = () => {
  joinValues()
  const data = {numbers: submission.join('')}
  console.log('data', data)

  fetch('http://localhost:8000/solve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(data => {
      console.log(data)
      populateValues(data.canBeSolved, data.answer)
      submission = []
    })
    .catch((error) => {
      console.error('Error:', error)
    })

}

solveButton.addEventListener('click', solve)
