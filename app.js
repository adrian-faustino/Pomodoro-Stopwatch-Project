//Dom cache
const addButton = document.querySelector('.enter-button');
const clockContainer = document.querySelector('.clock-container');
const selectionArray = document.getElementsByClassName('selection');
const textInput = document.getElementById('task-title-input');
const inputPrompt_span = document.querySelector('.input-prompt');

//variables
let currentDuration = 15; //this is set by setDuration() defaulting at 15

//event listener
addButton.addEventListener('click', (e) => {
  //add check here later, if input empty dont
  e.preventDefault();
  if (textInput.value == '') {
    return emptyTextError() 
  }
  addEntry();
  animateButtonClick(addButton);
  textInput.value = '';
});

//selection buttons
for (let i = 0; i < selectionArray.length; i++) {
  let currentButton = selectionArray[i];
  currentButton.addEventListener('click', () => {
    highlightButton(currentButton);
    setDuration(currentButton);
  });
}

function emptyTextError() {
  inputPrompt_span.classList.add('active');
  addButton.classList.add('error')
  setTimeout(() => {
    inputPrompt_span.classList.remove('active');
    addButton.classList.remove('error');
  }, 700);
}

function animateButtonClick(element) {
  element.classList.add('active');
  setTimeout(() => {
    element.classList.remove('active');
  }, 700);
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
  const newDiv = createElement('div', 'new-entry', clockContainer);

  //text input within the new entry
  const description = createElement('div', 'stopwatch-description', newDiv);
  setTextInput(description);

  //create the stopwatch container and all the elements inside it
  const stopwatchContainer = createElement('div', 'stopwatch-container', newDiv);
  createElement('span', 'minutes', stopwatchContainer);
  createElement('span', 'seconds', stopwatchContainer);
  createElement('span', 'miliseconds', stopwatchContainer);

  //delete button
  let delete_button = createElement('div', 'delete-button', newDiv);
  delete_button.addEventListener('click', () => {
    clockContainer.removeChild(newDiv);
  });

  //create new object stopwatch
  let stopwatch = new Stopwatch(newDiv);
  stopwatch.setDisplay();
  newDiv.addEventListener('click', () => {
    newDiv.classList.toggle('active');
    if (stopwatch.isOn) {
      stopwatch.stop();
    } else {
      stopwatch.start();
    }
  });
}

//stopwatch constructor
function Stopwatch(div) {
  let minute = currentDuration;
  let second = 0;
  let milisecond = 0;
  this.isOn = false;
  let interval;

  //DOM cache
  let min_span = div.querySelector('.minutes');
  let second_span = div.querySelector('.seconds');
  let milisecond_span = div.querySelector('.miliseconds');

  function updateDisplay() {
    min_span.innerHTML = setZero(minute);
    second_span.innerHTML = setZero(second);
    milisecond_span.innerHTML = setZero(milisecond);
  }

  this.setDisplay = function() {
    min_span.innerHTML = setZero(minute);
    second_span.innerHTML = setZero(second);
    milisecond_span.innerHTML = setZero(milisecond);
  };

  function setZero(num) {
    let numStr = num.toString();
    if (numStr.length == 1) {
      numStr = '0' + numStr;
    }
    return numStr;
  }

  //stopwatch start stop functions
  this.start = function() {
    this.isOn = true;
    interval = setInterval(() => {
      reduceMilisecond();
      updateDisplay();
    }, 10);
  };

  this.stop = function() {
    this.isOn = false;
    clearInterval(interval);
  };

  function reduceMilisecond() {
    if (milisecond == 0) {
      milisecond = 99;
      reduceSecond();
    } else {
      milisecond -= 1;
    }
  }

  function reduceSecond() {
    if (second == 0) {
      reduceMinute();
      second = 59;
    } else {
      second--;
    }
  }

  function reduceMinute() {
    if (minute == 0) {
      this.stop();
    } else {
      minute--;
    }
  }
}

//delete button