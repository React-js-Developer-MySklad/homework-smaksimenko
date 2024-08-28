import React from 'react';
import {render, fireEvent, screen, waitFor, act, within} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Counterparty, CounterpartyProvider} from '../../context/CounterpartyContext';
import {Table} from "./table";

const mockCounterparties = [
    { id: '1', name: 'Test Company', inn: 123456, kpp: 654321, address: '123 Street' },
    { id: '2', name: 'Another Company', inn: 654321, kpp: 123456, address: '456 Avenue' },
];

jest.mock('axios', () => ({
    get: jest.fn((url: string) => {
        if (url === 'http://localhost:5000/counterparties') {
            return Promise.resolve({ data: mockCounterparties });
        } else if (url.startsWith('http://localhost:5000/counterparties/')) {
            const id = url.split('/').pop();
            const counterparty = mockCounterparties.find(c => c.id === id);
            return Promise.resolve({ data: counterparty });
        }
    }),
    post: jest.fn((url: string, counterparty: Counterparty) => {
        mockCounterparties.push(counterparty);
        return Promise.resolve({ data: counterparty });
    }),
    put: jest.fn((url: string, counterparty: Counterparty) => {
        const index = mockCounterparties.findIndex(c => c.id === counterparty.id);
        mockCounterparties[index] = counterparty;
        return Promise.resolve({ data: counterparty });
    }),
    delete: jest.fn((url: string) => {
        const id = url.split('/').pop();
        const index = mockCounterparties.findIndex(c => c.id === id);
        if (index >= 0) mockCounterparties.splice(index, 1);
        return Promise.resolve();
    })
}));

describe('Table Component', () => {
    beforeEach(async () => {
        await act(async () => {
            render(
                <CounterpartyProvider>
                    <Table />
                </CounterpartyProvider>
            );
        });
    });

    test('рендер таблицы с корректными заголовками', () => {
        expect(screen.getByRole('columnheader', { name: 'НАИМЕНОВАНИЕ' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'ИНН' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'АДРЕС' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'КПП' })).toBeInTheDocument();
    });

    test('рендер таблицы с инициализацией дефолтных контрагентов', () => {
        expect(screen.getAllByRole('row').length).toBe(mockCounterparties.length + 1);
        expect(screen.getByText(mockCounterparties[0].name)).toBeInTheDocument();
        expect(screen.getByText(mockCounterparties[1].name)).toBeInTheDocument();
    });

    test('добавление контрагента', async () => {
        fireEvent.click(screen.getByText(/Add Data/i));
        fireEvent.change(screen.getByLabelText(/Наименование/i), { target: { value: 'Тестовая Компания' } });
        fireEvent.change(screen.getByLabelText(/ИНН/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByLabelText(/КПП/i), { target: { value: '123456789' } });
        fireEvent.change(screen.getByLabelText(/Адрес/i), { target: { value: '12345, Москва, Тест' } });
        fireEvent.click(screen.getByText(/Принять/i));
        await waitFor(() => expect(screen.getAllByRole('row').length).toBe(mockCounterparties.length + 2));
    });

    test('выбор контрагента для обновления', async  () => {
        await waitFor(() => expect(screen.getByText(mockCounterparties[1].name)).toBeInTheDocument());
        fireEvent.dblClick(screen.getByText(mockCounterparties[1].name));

        await waitFor(() => {
            expect(screen.getByLabelText(/Наименование/i)).toHaveValue(mockCounterparties[1].name);
            expect(screen.getByLabelText(/ИНН/i)).toHaveValue(String(mockCounterparties[1].inn));
            expect(screen.getByLabelText(/КПП/i)).toHaveValue(String(mockCounterparties[1].kpp));
            expect(screen.getByLabelText(/Адрес/i)).toHaveValue(mockCounterparties[1].address);
        });
    });

    test('удаление контрагента', async () => {
        let name = mockCounterparties[0].name;
        let length = mockCounterparties.length;
        expect(screen.queryByText(name)).toBeInTheDocument();
        expect(screen.getAllByRole('row').length).toBe(length + 1);

        const row = screen.queryByText(name).closest('tr');
        const deleteButton = within(row).getByText(/Удалить/i);
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.queryByText(name)).toBeNull();
            expect(screen.getAllByRole('row').length).toBe(length);
        });
    });
});