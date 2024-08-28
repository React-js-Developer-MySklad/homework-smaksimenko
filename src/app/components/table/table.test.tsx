import React from 'react';
import {render, fireEvent, within, queryByText} from '@testing-library/react';
import { Table } from './table';
import { Modal } from '../modal/modal';
import {Counterparty} from "../../data";

jest.mock('../modal/modal', () => {
    return {
        Modal: jest.fn(({ onAdd }) => (
            <div>
                <button onClick={() => onAdd({ id: 3, name: 'Company C', inn: 1231231230, kpp: 321321321, address: 'Address C' })}>
                    Add Counterparty
                </button>
            </div>
        )),
    };
});

const initialCounterparties: Counterparty[] = [
    { id: 1, name: 'Company A', inn: 1234567890, kpp: 123456789, address: 'Address A' },
    { id: 2, name: 'Company B', inn: 9876543210, kpp: 987654321, address: 'Address B' },
];

describe('Table Component', () => {
    let counterparties: Counterparty[];

    beforeEach(() => {
        counterparties = [...initialCounterparties];
        Object.defineProperty(require('../../data'), 'counterparties', {
            value: counterparties,
            writable: true,
            configurable: true,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('рендер таблици с инициализацией дефолтных контрагентов', () => {
        const { getByText } = render(<Table />);
        expect(getByText(/Company A/i)).toBeInTheDocument();
        expect(getByText(/Company B/i)).toBeInTheDocument();
    });

    test('открытие модального окна для добавления контрагента', () => {
        const { getByText } = render(<Table />);

        fireEvent.click(getByText(/Add Data/i));

        expect(Modal).toHaveBeenCalledWith(
            expect.objectContaining({
                counterparty: { id: 0, name: '', inn: 0, kpp: 0, address: '' },
            }),
            expect.anything()
        );
    });

    test('добавление нового контрагента', () => {
        const { getByText } = render(<Table />);

        fireEvent.click(getByText(/Add Data/i));

        fireEvent.click(getByText(/Add Counterparty/i));

        expect(getByText(/Company C/i)).toBeInTheDocument();
    });

    test('удаление контрагента', () => {
        const { queryByText } = render(<Table />);
        expect(queryByText(/Company A/i)).toBeInTheDocument();

        const row = queryByText(/Company A/i).closest('tr');
        const deleteButton = within(row).getByText(/Удалить/i);
        fireEvent.click(deleteButton);

        expect(queryByText(/Company A/)).toBeNull();
    });

    test('выбор контрагента для обновления', () => {
        const { getByText } = render(<Table />);

        fireEvent.dblClick(getByText(/Company A/i));

        expect(Modal).toHaveBeenCalledWith(
            expect.objectContaining({
                counterparty: { id: 1, name: 'Company A', inn: 1234567890, kpp: 123456789, address: 'Address A' },
            }),
            expect.anything()
        );
    });
});