//Dom cache
const addButton = document.getElementById('enter-button');
const clockContainer = document.querySelector('.clock-container');
const selectionArray = document.getElementsByClassName('selection');

//variables
let currentDuration; //this is set by setDuration()

//event listener
addButton.addEventListener('click', (e) => {
  //add check here later, if input empty dont
  e.preventDefault();
  addEntry();
});

//selection buttons
for (let i = 0; i < selectionArray.length; i++) {
  let currentButton = selectionArray[i];
  currentButton.addEventListener('click', () => {
    highlightButton(currentButton);
    setDuration(currentButton);
  });
}

function highlightButton(element) {
  for (let i = 0; i < selectionArray.length; i++) {
    selectionArray[i].classList.remove('active');
  }
  element.classList.add('active');
}

function setDuration(element) {
  switch (element.innerHTML) {
    case '15 mins':
      currentDuration = 15;
      break;
    case '20 mins':
      currentDuration = 20;
      break;
    case '30 mins':
      currentDuration = 30;
      break;
    case '60 mins':
      currentDuration = 60;
      break;
  }
}

function setTextInput(element) {
  const textInput = document.getElementById('task-title-input');
  currentInput = textInput.value;
  element.innerHTML = currentInput + ' for ' + currentDuration + ' mins';
}

function createElement(element, className, parentDiv) {
  let newDiv = document.createElement(element);
  parentDiv.appendChild(newDiv);
  newDiv.classList.add(className);
  return newDiv;
}

//stop watch
function addEntry() {
  let newDiv = createElement('div', 'new-entry', clockContainer);

  //text input within the new entry
  let description = createElement('div', 'stopwatch-description', newDiv);
  setTextInput(description);

  //stopwatch within the new entry
  let stopwatchContainer = createElement('div', 'stopwatch-container', newDiv);
  createElement('span', 'minutes', stopwatchContainer);
  createElement('span', 'seconds', stopwatchContainer);
  createElement('span', 'miliseconds', stopwatchContainer);

  //create new object stopwatch
  let stopwatch = new Stopwatch(newDiv);
  newDiv.addEventListener('click', () => {
    stopwatch.increaseSecond();
  });
}

//stopwatch constructor
function Stopwatch(div) {
  let minute = 0;
  let min_span = div.querySelector('.minutes');

  this.increaseSecond = function() {
    minute++;
    updateDisplay();
  };

  function updateDisplay() {
    min_span.innerHTML = minute;
  }
}

