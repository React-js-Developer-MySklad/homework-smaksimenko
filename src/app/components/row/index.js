import html from './row.html'

class Row {
    #row;
    #column1;
    #column2;
    #column3;
    #column4;

    constructor(columnText1, columnText2, columnText3, columnText4) {
        this.#row = this.elementFromHtml(html);
        this.#column1 = this.#row.querySelector('#column1');
        this.#column1.textContent = columnText1
        this.#column2 = this.#row.querySelector('#column2');
        this.#column2.textContent = columnText2
        this.#column3 = this.#row.querySelector('#column3');
        this.#column3.textContent = columnText3
        this.#column4 = this.#row.querySelector('#column4');
        this.#column4.textContent = columnText4

        const deleteButton = this.#row.querySelector('#delete_button');
        deleteButton.addEventListener('click', () => this.removeRow());

        this.#row.addEventListener('click', () => this.setDataToModal());
        this.#row.setAttribute('data-modal-toggle', 'modal_add');
        this.#row.setAttribute('data-modal-target', 'modal_add');
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
        this.#row.remove();
    }

    setDataToModal() {
        console.log("click by row");
        document.getElementById('name').value = 1;
        document.getElementById('inn').value = 33;
        document.getElementById('kpp').value = 44;
        document.getElementById('address').value = 55;
    }
}

export default Row;