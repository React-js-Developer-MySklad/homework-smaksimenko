import React from "react";
import './row.css'
import {useCounterpartyContext, Counterparty} from "../../context/CounterpartyContext";

interface RowProps {
    counterparty: Counterparty;
    onDelete: (id: string) => void;
    onUpdate: (id: string) => void;
}

export const Row: React.FC<RowProps> = ({ counterparty, onDelete, onUpdate }) => {
    const { getCounterparty } = useCounterpartyContext();

    function deleteRow() {
        onDelete(counterparty.id);
    }

    function openModal() {
        const button = document.getElementById('show-add-modal');
        button.click();
        onUpdate(counterparty.id);
    }

    return (
        <tr onDoubleClick={openModal} className="border-b dark:border-gray-700">
            <th id="column1" scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{counterparty.name}</th>
            <td id="column2" >{counterparty.inn}</td>
            <td id="column3" className="font-bold font-black">{counterparty.address}</td>
            <td>
                <div>
                    <span id="column4">{counterparty.kpp}</span>
                </div>
            </td>
            <td>
                <button id="delete_button" onClick={deleteRow} className="text-red-600 hover:text-red-900">Удалить</button>
            </td>
        </tr>)
}