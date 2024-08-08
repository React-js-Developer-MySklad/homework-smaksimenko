import html from './row.html'
import modal from "../modal";
import mainTable, {tableRefresh} from "../table";


class Row {
    #row;
    #columnName;
    #columnINN;
    #columnAddress;
    #columnKPP;

    constructor(columnText1, columnText2, columnText3, columnText4) {
        this.#row = this.elementFromHtml(html);

        this.#columnName = this.#row.querySelector('#column1');
        this.#columnName.textContent = columnText1
        this.#columnINN = this.#row.querySelector('#column2');
        this.#columnINN.textContent = columnText2
        this.#columnAddress = this.#row.querySelector('#column3');
        this.#columnAddress.textContent = columnText3
        this.#columnKPP = this.#row.querySelector('#column4');
        this.#columnKPP.textContent = columnText4

        const deleteButton = this.#row.querySelector('#delete_button');
        deleteButton.addEventListener('click', () => this.removeRow());

        this.#row.addEventListener('dblclick', () => this.openUpdateDataModal());
    }

    get name() {
        return this.#columnName.textContent;
    }

    asDOMElement() {
        return this.#row;
    }

    elementFromHtml(html) {
        const container = document.createElement("template");
        container.innerHTML = html;
        return container.content.firstElementChild;
    }

    removeRow() {
        mainTable.deleteRow(this);
        tableRefresh();
    }

    openUpdateDataModal(){
        document.getElementById('show-add-modal').click();
        modal.row = this;
        modal.name = this.#columnName.textContent;
        modal.INN = this.#columnINN.textContent;
        modal.KPP = this.#columnKPP.textContent;
        modal.address = this.#columnAddress.textContent;
    }
}

export default Row;