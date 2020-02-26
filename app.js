//DOM Cache
const parentContainer = document.querySelector('.clock-container');
const enterButton = document.getElementById('enter-button');

const fifteenMins = document.getElementById('fifteenMins');
const twentyMins = document.getElementById('twentyMins');
const fortyMins = document.getElementById('fortyMins');
const oneHour = document.getElementById('oneHour');
const selectionArray = document.getElementsByClassName('selection');

//event listeners
enterButton.addEventListener('click', function(e) {
  if (currentDuration == 0) {
    return;
  }
  e.preventDefault();
  setTextInput();
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
  newDiv.innerHTML = currentInput + ' for ' + currentDuration + ' mins';
}

function setTextInput() {
  const textInput = document.getElementById('task-title-input');
  currentInput = textInput.value;
}