import html from './table.html'
import Row from '../row'

class Table {
    table;


    constructor() {
        this.table = this.elementFromHtml(html);

        // const additionButton = this.table.querySelector('#add_counteragent');
        // additionButton.addEventListener('click', () => this.createRow());
    }

    asDOMElement() {
        return this.table;
    }

    elementFromHtml(html) {
        const container = document.createElement("template");
        container.innerHTML = html;
        return container.content.firstElementChild;
    }

     createRow = function (name, inn, address, kpp){
        console.log('name : ' + name);
        let row = new Row(name, inn, kpp, address);
        let tbody = document.getElementById("tbody")
        tbody.appendChild(row.asDOMElement());
    }
}

export default Table;