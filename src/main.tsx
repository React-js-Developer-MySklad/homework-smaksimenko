import 'flowbite';

import './style.css'
import {createRoot} from "react-dom/client";
import App from "./app/app";
const rootElement = document.getElementById('root');
const divElement = document.createElement('div');

divElement.classList.add('layout');
const buttonElement = document.createElement('button');
buttonElement.innerHTML = 'Click Me';
buttonElement.addEventListener('click', () => alert('Button has been clicked'))
divElement.appendChild(buttonElement)

const root = createRoot(rootElement)

root.render(<App/>);