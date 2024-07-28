import html from './modal.html'

class Modal {
    #modal;
    #saveButton;

    constructor() {
        this.#modal = this.elementFromHtml(html);
        this.#saveButton = this.#modal.querySelector('#save_button');
    }

    getSaveButton(){
        return this.#saveButton;
    }

    asDOMElement() {
        return this.#modal;
    }

    elementFromHtml(html) {
        const container = document.createElement("template");
        container.innerHTML = html;
        return container.content.firstElementChild;
    }

    getName(){
        return document.getElementById('name').value;
    }

    getINN(){
        return document.getElementById('inn').value;
    }

    getKPP(){
        return document.getElementById('kpp').value;
    }

    getAddress(){
        return document.getElementById('address').value;
    }

    saveData(createRow) {
        let productName = this.getName();
        let productPrice = this.getINN();
        let productCategory = this.getKPP();
        let productDescription = this.getAddress();

        createRow(productName, productPrice, productCategory, productDescription);
    }

    open() {
        this.#modal.classList.remove('hidden');
        this.#modal.classList.add('flex');
    }



}

export default Modal;