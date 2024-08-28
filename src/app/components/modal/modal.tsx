import React from "react";
import { Form, Field } from 'react-final-form';
import { Counterparty } from "../../context/CounterpartyContext";

type ModalProps = {
    onAdd: (counterparty: Counterparty) => void;
    counterparty: Counterparty;
};

interface RenderFieldProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
}

function generateId() {
    return String(Date.now() + Math.floor(Math.random() * 1000));
}
const validate = (values: any) => {
    const errors: { [key: string]: string } = {};
    if (!values.name) {
        errors.name = "Наименование обязательно";
    }
    if (!values.inn || !/^\d{10}$/.test(values.inn)) {
        errors.inn = "ИНН должен содержать ровно 10 цифр";
    }
    if (!values.kpp || !/^\d{9}$/.test(values.kpp)) {
        errors.kpp = "КПП должен содержать ровно 9 цифр";
    }
    if (!values.address) {
        errors.address = "Адрес обязателен";
    }
    return errors;
};

export const Modal: React.FC<ModalProps> = ({ onAdd, counterparty }) => {
    const initialValues = {
        id: String(counterparty.id) || generateId(),
        name: counterparty.name || '',
        inn: counterparty.inn || '',
        kpp: counterparty.kpp || '',
        address: counterparty.address || ''
    };

    return (
        <div id="modal_add" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 max-h-full">
            <div className="relative p-4 max-h-full">
                <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                    <Form
                        onSubmit={onAdd}
                        initialValues={initialValues}
                        validate={validate}
                        render={({ handleSubmit, submitting, pristine, invalid, form }) => (
                            <form onSubmit={handleSubmit} className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <RenderField name="name" label="Наименование" placeholder="Введите наименование" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <RenderField name="inn" label="ИНН" placeholder="Введите ИНН" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <RenderField name="kpp" label="КПП" placeholder="Введите КПП" />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Адрес</label>
                                        <Field name="address"
                                               >
                                            {({ input, meta }) => (
                                                <div>
                                                    <textarea {...input} id="address" rows={4} placeholder="Введите адрес"
                                                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    {meta.error && meta.touched && <p className="text-red-500 text-xs mt-1">{meta.error}</p>}
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button type="submit" onClick={() => {
                                        form.submit()
                                        if (!invalid) {
                                            const modalToggleElement = document.querySelector('[data-modal-toggle="modal_add"]');
                                            if (modalToggleElement instanceof HTMLElement) {
                                                modalToggleElement.click();
                                            }
                                        }
                                    }}
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Принять
                                    </button>
                                    <button type="button" onClick={() => form.reset()}
                                            data-modal-toggle="modal_add"
                                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Отменить
                                    </button>
                                </div>
                            </form>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

const RenderField: React.FC<RenderFieldProps> = ({ name, label, type = "text", placeholder}) => (
    <Field name={name} >
        {({ input, meta }) => (
            <div>
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                <input {...input} type={type} id={name} placeholder={placeholder}
                       className={`bg-gray-50 border ${meta.error && meta.touched ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                />
                {meta.error && meta.touched && <p className="text-red-500 text-xs mt-1">{meta.error}</p>}
            </div>
        )}
    </Field>
);
