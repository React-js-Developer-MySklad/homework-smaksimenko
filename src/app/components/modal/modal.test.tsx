import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Modal } from './modal';
import {Counterparty} from "../../context/CounterpartyContext";

describe('modal', () => {
    let onAddMock: jest.Mock;
    let counterpartyMock: Counterparty;

    beforeEach(() => {
        onAddMock = jest.fn();

        counterpartyMock = {
            id: '',
            name: '',
            inn: '',
            kpp: '',
            address: ''
        } as Counterparty;
    });

    test('рендер модельного окна', () => {
        const { getByLabelText } = render(<Modal onAdd={onAddMock} counterparty={counterpartyMock} />);
        expect(getByLabelText(/Наименование/i)).toBeInTheDocument();
        expect(getByLabelText(/ИНН/i)).toBeInTheDocument();
        expect(getByLabelText(/КПП/i)).toBeInTheDocument();
        expect(getByLabelText(/Адрес/i)).toBeInTheDocument();
    });

    test('ввод наименования', () => {
        const { getByLabelText } = render(<Modal onAdd={onAddMock} counterparty={counterpartyMock}/>);
        const nameInput = getByLabelText(/Наименование/i) as HTMLInputElement;

        fireEvent.change(nameInput, { target: { value: 'Тестовая Компания' } });
        expect(nameInput.value).toBe('Тестовая Компания');
    });

    test('ввод числового значения в поле ИНН', () => {
        const { getByLabelText } = render(<Modal onAdd={onAddMock} counterparty={counterpartyMock}/>);
        const innInput = getByLabelText(/ИНН/i) as HTMLInputElement;

        fireEvent.change(innInput, { target: { value: '1234567890' } });
        expect(innInput.value).toBe('1234567890');

        fireEvent.change(innInput, { target: { value: '12345678901' } });
        expect(innInput.value).toBe('12345678901');
    });

    test('отклонение ввода нечислового значнеия в поле ИНН', () => {
        const { getByText, getByLabelText } = render(<Modal onAdd={onAddMock} counterparty={counterpartyMock}/>);
        const innInput = getByLabelText(/ИНН/i) as HTMLInputElement;

        fireEvent.change(innInput, { target: { value: 'invalid_inn' } });
        expect(innInput.value).toBe("invalid_inn");

        fireEvent.click(getByText(/Принять/i));

        expect(onAddMock).not.toHaveBeenCalled();
    });

    test('нажатие на кнопку сохраненеия', () => {
        const { getByLabelText, getByText } = render(<Modal onAdd={onAddMock} counterparty={counterpartyMock}/>);

        fireEvent.change(getByLabelText(/Наименование/i), { target: { value: 'Тестовая Компания' } });
        fireEvent.change(getByLabelText(/ИНН/i), { target: { value: '1234567890' } });
        fireEvent.change(getByLabelText(/КПП/i), { target: { value: '123456789' } });
        fireEvent.change(getByLabelText(/Адрес/i), { target: { value: '12345, Москва, Тест' } });

        fireEvent.click(getByText(/Принять/i));

        expect(onAddMock).toHaveBeenCalledTimes(1);

        const firstCallArgs = onAddMock.mock.calls[0];
        expect(firstCallArgs[0]).toEqual(expect.objectContaining({
            name: 'Тестовая Компания',
            inn: '1234567890',
            kpp: '123456789',
            address: '12345, Москва, Тест',
        }));
    });

    test('не вызывается onAdd с невалидными значениями', () => {
        const { getByText, getByLabelText } = render(<Modal onAdd={onAddMock} counterparty={counterpartyMock}/>);

        fireEvent.change(getByLabelText(/ИНН/i), { target: { value: 'invalid_inn' } });
        fireEvent.click(getByText(/Принять/i));

        expect(onAddMock).not.toHaveBeenCalled();
    });
});