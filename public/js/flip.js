const n = document.getElementById('username');
const log = document.getElementById('log');
const flip = document.getElementById('flip');
const color = document.getElementById('colorSelect');
const msgs = document.getElementById('messages');
const socket = io();

import ColorFactory from './ColorFactory.js';

const factory = new ColorFactory();
let currentColor;

color.addEventListener('change', (e) => {
  currentColor = factory.getColor(color.value);
  document.body.style.color = currentColor.getColor();
});

flip.addEventListener('click', (e) => {
  if (n.value.trim().length > 0) {
    socket.emit('userflip', {
      name: n.value,
    });
  } else {
    alert('You must enter a name.');
  }
});

socket.on('announcement', (response) => {
  const item = document.createElement('li');
  if (response.status === 'success') {
    item.innerHTML = `${response.name} flipped ${response.result}`;
  } else {
    item.innerHTML = response.message;
  }
  msgs.appendChild(item);
  const c = document.getElementById('log');
  log.scrollTo(0, c.scrollHeight);
  if (response.status === 'success') {
    console.log(response);
  }
});
