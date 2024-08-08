import html from './modal.html'
import mainTable from "../table";

class Modal {
    #modal;
    #saveButton;
    #row;

    constructor() {
        this.#modal = this.elementFromHtml(html);
        this.#saveButton = this.#modal.querySelector('#save_button');
        this.#saveButton.addEventListener('click', () => mainTable.addRow());
    }

    asDOMElement() {
        return this.#modal;
    }

    elementFromHtml(html) {
        const container = document.createElement("template");
        container.innerHTML = html;
        return container.content.firstElementChild;
    }

    get name(){
        return document.getElementById('name').value;
    }

    get INN(){
        return document.getElementById('inn').value;
    }

    get KPP(){
        return document.getElementById('kpp').value;
    }

    get address(){
        return document.getElementById('address').value;
    }

    set name(value){
        document.getElementById('name').value = value;
    }

    set INN(value){
        document.getElementById('inn').value = value;
    }

    set KPP(value){
        document.getElementById('kpp').value = value;
    }

    set address(value){
        document.getElementById('address').value = value;
    }

    set row(row) {
        this.#row = row;
    }

    get row() {
        return this.#row;
    }

    clear(){
        this.name = '';
        this.INN = '';
        this.KPP = '';
        this.address = '';
    }
}

let modal = new Modal();

export default modal;