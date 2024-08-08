import html from "./app.html";
import './app.css'

import mainTable, {tableRefresh} from './components/table'
import modal from './components/modal'

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

let table = mainTable;
const main = document.getElementById("main");

main.appendChild(modal.asDOMElement())
main.appendChild(table.asDOMElement())

tableRefresh()