import html from './table.html'
import Row from '../row'
import modal from "../modal";

let counterparties = [
    new Row("Компания А", "1234567890", "г. Москва, ул. Ленина, д. 1", "987654321"),
    new Row("Компания Б", "0987654321", "г. Санкт-Петербург, ул. Пушкина, д. 2", "123456789"),
    new Row("Компания В", "1122334455", "г. Новосибирск, ул. Лермонтова, д. 3", "543216789")
];

class Table {
    #table;
    #showButton;
    #counterpartiesArr = [];

    constructor() {
        this.#table = this.elementFromHtml(html);
        counterparties.forEach(row => {
            this.#counterpartiesArr.push(row);
        });
        this.#showButton = this.#table.querySelector('#show-add-modal');
        this.#showButton.addEventListener('click', () => modal.clear());
    }

    asDOMElement() {
        return this.#table;
    }

    elementFromHtml(html) {
        const container = document.createElement("template");
        container.innerHTML = html;
        return container.content.firstElementChild;
    }

    get counterpartiesArr() {
        return this.#counterpartiesArr;
    }

    get showButton() {
        return this.#showButton;
    }

    addRow(){
        let row = new Row(modal.name.value, modal.INN.value, modal.address.value, modal.KPP.value);
        if (modal.row == null)
            this.#counterpartiesArr.push(row);
        else
            this.#counterpartiesArr[this.#counterpartiesArr.indexOf(modal.row)] = row;
        modal.row = null;
        tableRefresh();
    }

    deleteRow(row){
        this.#counterpartiesArr.splice(this.#counterpartiesArr.indexOf(row), 1);
    }
}

let mainTable = new Table()


function clearTable() {
    let tbody = document.getElementById("tbody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

export function tableRefresh() {
    let tbody = document.getElementById("tbody");
    clearTable();
    mainTable.counterpartiesArr.forEach(row => tbody.appendChild(row.asDOMElement()));
}
export default mainTable;