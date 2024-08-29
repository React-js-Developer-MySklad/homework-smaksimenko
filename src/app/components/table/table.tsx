import React, {useState} from "react";
import './table.css'
import logo from '../../images/logo.svg';
import addition from '../../images/addition.svg';
import {Row} from "../row/row";
import {counterparties, Counterparty} from "../../data";
import {Modal} from "../modal/modal";
import {TableNavigation} from "../tableNavigation/tableNavigation";

export const Table = () => {
    const [counterpartiesArray, setCounterparties] = useState(counterparties)
    const initialCounterparty = {
        id: 0,
        name: '',
        inn: 0,
        kpp: 0,
        address: ''
    };
    const [counterpartyToUpdate, setCounterpartyToUpdate] = useState<Counterparty>(initialCounterparty)

    const handleAdd = (counterparty: Counterparty) => {
        setCounterparties((prevCounterparties) => {
            const existingIndex = prevCounterparties.findIndex((c) => c.id === counterparty.id);
            if (existingIndex !== -1) {
                const updatedCounterparties = [...prevCounterparties];
                updatedCounterparties[existingIndex] = counterparty; // Обновляем существующий контрагент
                return updatedCounterparties;
            } else {
                return [...prevCounterparties, counterparty];
            }
        });
    };

    const handleDelete = (id: number) => {
        setCounterparties(counterpartiesArray.filter(counterparty => counterparty.id !== id));
    };

    const handleUpdate = (id: number) => {
        setCounterpartyToUpdate(counterpartiesArray.find(counterparty => counterparty.id === id));
    };

    return (
        <>
            <Modal onAdd={handleAdd} counterparty={counterpartyToUpdate}></Modal>
            <section id="main_table" className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div
                            className="flex flex-col md:flex-row items-end justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <img src={logo} alt="logo"/>
                            </div>
                            <div
                                className="md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <AddButton onClick={() => setCounterpartyToUpdate(initialCounterparty)}/>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <tbody
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col">НАИМЕНОВАНИЕ</th>
                                    <th scope="col">ИНН</th>
                                    <th scope="col">АДРЕС</th>
                                    <th scope="col">КПП</th>
                                    <th scope="col"></th>
                                </tr>
                                </tbody>
                                <tbody id="tbody">
                                {counterpartiesArray.map((counterparty, index) => (
                                    <Row key={index} counterparty={counterparty} onDelete={handleDelete}
                                         onUpdate={handleUpdate}></Row>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <TableNavigation></TableNavigation>
                    </div>
                </div>
            </section>
        </>)
}


const AddButton = (props: { onClick: () => void }) => {
    return <button id="show-add-modal" data-modal-target="modal_add" data-modal-toggle="modal_add"
                   type="button"
                   onClick={props.onClick}
                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <img src={addition} alt="addition"/>
        Add Data
    </button>;
}