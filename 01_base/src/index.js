import name from './base';
import './index.css';

document.querySelector('#root').innerHTML = name;


import imgSrc from './images/timg.jpg';
let img = new Image();
img.src = imgSrc;
img.width = 100;
document.body.appendChild(img);