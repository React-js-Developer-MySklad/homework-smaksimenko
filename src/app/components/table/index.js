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
    #counterpartiesArr = [];

    constructor() {
        this.#table = this.elementFromHtml(html);
        counterparties.forEach(row => {
            console.log(row.name);
            this.#counterpartiesArr.push(row);
        });
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

    addRow(){
        let row = new Row(modal.name, modal.INN, modal.address, modal.KPP, modal);
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
    mainTable.counterpartiesArr.values().forEach(row => tbody.appendChild(row.asDOMElement()));
}
export default mainTable;