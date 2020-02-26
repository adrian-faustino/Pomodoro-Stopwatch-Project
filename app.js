//DOM Cache
const parentContainer = document.querySelector('.clock-container');
const enterButton = document.getElementById('enter-button');
const selectionArray = document.getElementsByClassName('selection');

//event listeners
enterButton.addEventListener('click', function(e) {
  if (currentDuration == 0) {
    return;
  }
  e.preventDefault();
  createEntry();
});

for (let i = 0; i < selectionArray.length; i++) {
  let currentButton = selectionArray[i];
  currentButton.addEventListener('click', () => {
    highlightButton(currentButton);
    setDuration(currentButton);
  });
}

// clock
let currentDuration = 0;
let currentInput = '';

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

function createEntry() {
  const newDiv = document.createElement('div');
  parentContainer.appendChild(newDiv);

  newDiv.setAttribute('class', 'new-entry');
  setTextInput(newDiv)
  appendStopwatch(newDiv);
}

function setTextInput(element) {
  const textInput = document.getElementById('task-title-input');
  currentInput = textInput.value;
  element.innerHTML = currentInput + ' for ' + currentDuration + ' mins';
}

// stopwatch
let currentMilisecond = 0;
let currentSecond = 0;
let currentMinute = currentDuration;

function appendStopwatch(element) {
  const newDiv = document.createElement('div');
  element.appendChild(newDiv);
  newDiv.setAttribute('class', 'stopwatch-container');

  appendMinutes(newDiv);
  appendSeconds(newDiv);
  appendMiliseconds(newDiv);
}

function appendMiliseconds(parent) {
  const newSpan = document.createElement('span');
  parent.appendChild(newSpan);

  newSpan.setAttribute('class', 'stopwatch-display');
  newSpan.classList.add('miliseconds');
  newSpan.innerHTML = currentMilisecond;
}

function appendSeconds(parent) {
  const newSpan = document.createElement('span');
  parent.appendChild(newSpan);

  newSpan.setAttribute('class', 'stopwatch-display');
  newSpan.classList.add('seconds');
  newSpan.innerHTML = currentSecond;
}

function appendMinutes(parent) {
  const newSpan = document.createElement('span');
  parent.appendChild(newSpan);

  newSpan.setAttribute('class', 'stopwatch-display');
  newSpan.classList.add('minutes');
  newSpan.innerHTML = currentDuration;
}