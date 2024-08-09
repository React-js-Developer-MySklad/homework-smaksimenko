import html from './modal.html'
import mainTable from "../table";

class Modal {
    #modal;
    #saveButton;
    #row;
    #INN;
    #KPP;
    #address;
    #name;

    constructor() {
        this.#modal = this.elementFromHtml(html);
        this.#saveButton = this.#modal.querySelector('#save_button');
        this.#name = this.#modal.querySelector('#name');
        this.#INN = this.#modal.querySelector('#inn');
        this.#KPP = this.#modal.querySelector('#kpp');
        this.#address = this.#modal.querySelector('#address');

        this.#saveButton.addEventListener('click', () => mainTable.addRow());
        this.#INN.addEventListener('keypress', (event) => this.validate(event, 'inn'));
        this.#KPP.addEventListener('keypress', (event) => this.validate(event, 'kpp'));
    }

    validate(event, type) {
        const charCode = event.which || event.keyCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
            return false;
        }

        let validateCap;
        let inputLength;
        switch (type) {
            case 'kpp' :
                validateCap = 9;
                inputLength = this.#KPP.value.length;
                break;
            case 'inn' :
                validateCap = 11;
                inputLength = this.#INN.value.length;
                break;
            default :
                inputLength = 0;
                validateCap = 0;
        }
        if (inputLength >= validateCap) {
            event.preventDefault();
            return false;
        }
        return true;
    }

    asDOMElement() {
        return this.#modal;
    }

    elementFromHtml(html) {
        const container = document.createElement("template");
        container.innerHTML = html;
        return container.content.firstElementChild;
    }

    get INN() {
        return this.#INN;
    }

    set INN(value) {
        this.#INN = value;
    }

    get KPP() {
        return this.#KPP;
    }

    set KPP(value) {
        this.#KPP = value;
    }

    get address() {
        return this.#address;
    }

    set address(value) {
        this.#address = value;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    set row(row) {
        this.#row = row;
    }

    get row() {
        return this.#row;
    }

    clear(){
        if (modal.row == null) {
            this.name.value = '';
            this.INN.value = '';
            this.KPP.value = '';
            this.address.value = '';
        }
    }
}

let modal = new Modal();

export default modal;