import html from "./app.html";
import './app.css'

import Table from './components/table'
import Row from './components/row'
import Modal from './components/modal'

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

let table = new Table();
let modal = new Modal();
const main = document.getElementById("main");

let counterparties2 = [
    new Row("Компания А", "1234567890", "г. Москва, ул. Ленина, д. 1", "987654321"),
    new Row("Компания Б", "0987654321", "г. Санкт-Петербург, ул. Пушкина, д. 2", "123456789"),
    new Row("Компания В", "1122334455", "г. Новосибирск, ул. Лермонтова, д. 3", "543216789")
];

main.appendChild(modal.asDOMElement())
main.appendChild(table.asDOMElement())

// modal.getSaveButton().addEventListener('click', () => modal.saveData(table.createRow));

// counterparties.forEach(c => {
//     let row = new Row(c.name, c.inn, c.address, c.kpp);
//     tbody.appendChild(row.asDOMElement());
// })



modal.getSaveButton().addEventListener('click', () => addRow());

function clearTable() {
    let tbody = document.getElementById("tbody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

function tableRefresh() {
    let tbody = document.getElementById("tbody");
    clearTable();
    counterparties2.forEach(row => tbody.appendChild(row.asDOMElement()));
}

function addRow(){
    counterparties2.push(new Row(modal.getName(), modal.getINN(), modal.getKPP(), modal.getAddress()));
    tableRefresh();
}

tableRefresh();