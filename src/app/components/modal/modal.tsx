import React, {useEffect, useState} from "react";
import {Counterparty} from "../../data";
import {log} from "util";

type ModalProps = {
    onAdd: (counterparty: Counterparty) => void;
    counterparty: Counterparty;
};

export const Modal: React.FC<ModalProps> = ({ onAdd, counterparty }) => {
    const [id, setId]  = useState<string>(String(counterparty.id) || '');
    const [name, setName]  = useState<string>(counterparty.name || '');
    const [inn, setInn]  = useState<string>(String(counterparty.inn) || '');
    const [kpp, setKpp]  = useState<string>(String(counterparty.kpp) || '');
    const [address, setAddress]  = useState<string>(counterparty.address || '');
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    useEffect(() => {
        // Инициализируем состояние, если counterparty изменяется
        setId(String(counterparty.id) || '');
        setName(counterparty.name || '');
        setInn(String(counterparty.inn) || '');
        setKpp(String(counterparty.kpp) || '');
        setAddress(counterparty.address || '');
    }, [counterparty]);

    const generateId = () => {
        // Используем текущее время и случайное число для уникальности
        return Date.now() + Math.floor(Math.random() * 1000);
    };

    function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
        e.preventDefault();
        return false;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value; // Сохраняйте значение в отдельную переменную
        switch (event.target.id) {
            case 'name':
                setName(inputValue);
                break;
            case 'inn':
                if (/^\d*$/.test(inputValue) && inputValue.length <= 10) {
                    setInn(inputValue); // Устанавливаем строку
                }
                break;
            case 'kpp':
                if (/^\d*$/.test(inputValue) && inputValue.length <= 9) {
                    setKpp(inputValue); // Устанавливаем строку
                }
                break;
            default:
                break;
        }
    };

    const validate = () => {
        const newErrors: {[key: string]: string} = {};
        if (!name.trim()) {
            newErrors.name = "Наименование обязательно";
        }
        if (!inn || !/^\d{10}$/.test(inn)) {
            newErrors.inn = "ИНН должен содержать ровно 10 цифр";
        }
        if (!kpp || !/^\d{9}$/.test(kpp)) {
            newErrors.kpp = "КПП должен содержать ровно 9 цифр";
        }
        if (!address.trim()) {
            newErrors.address = "Адрес обязателен";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOnClick = () => {
        return () => {
            if (validate()) {
                console.log(id);
                onAdd({
                    id: Number(id) === 0 ? generateId() : Number(id),
                    name,
                    inn: Number(inn),
                    kpp: Number(kpp),
                    address
                });
                const button = document.getElementById('cancel_button');
                button.click();
            }
        };
    };

    return (
        <div id="modal_add" aria-hidden="true"
             className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 max-h-full">
            <div className="relative p-4 max-h-full">
                <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                    <form className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Наименование</label>
                                <input type="text" id="name"
                                       value={name}
                                       className={`bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                                       placeholder="Введите нименование" required={false} onChange={handleChange}></input>
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="inn"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ИНН</label>
                                <input type="text" id="inn"
                                       className={`bg-gray-50 border ${errors.inn ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                                       placeholder="Введите ИНН"
                                       required={false}
                                       onPaste={handlePaste}
                                       value={inn}
                                       onChange={handleChange}/>
                                {errors.inn && <p className="text-red-500 text-xs mt-1">{errors.inn}</p>}
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="kpp"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">КПП</label>
                                <input type="text" id="kpp"
                                       className={`bg-gray-50 border ${errors.kpp ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                                       placeholder="Введите КПП"
                                       required={false}
                                       onPaste={handlePaste}
                                       value={kpp}
                                       onChange={handleChange}></input>
                                {errors.kpp && <p className="text-red-500 text-xs mt-1">{errors.kpp}</p>}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="address"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Адрес</label>
                                <textarea id="address" rows={4}
                                          value={address}
                                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                          placeholder="Введите адрес" onChange={event => setAddress(String(event.target.value))}></textarea>
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>
                        </div>
                        <button id="save_button" type="button"
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleOnClick()}>
                            Принять
                        </button>
                        <button data-modal-toggle="modal_add" id="cancel_button" type="button"
                                className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Отменить
                        </button>
                    </form>
                </div>
            </div>
        </div>)
}