import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export type Counterparty = {
    id: string;
    name: string;
    inn: number;
    kpp: number;
    address: string;
};

interface CounterpartyContextType {
    counterparties: Counterparty[];
    getCounterparty: (id: string) => Promise<Counterparty>;
    addCounterparty: (counterparty: Counterparty) => void;
    updateCounterparty: (counterparty: Counterparty) => void;
    deleteCounterparty: (id: string) => void;
}

const CounterpartyContext = createContext<CounterpartyContextType | undefined>(undefined);

interface CounterpartyProviderProps {
    children: React.ReactNode;
    initialCounterparties?: Counterparty[];
}

export const CounterpartyProvider: React.FC<CounterpartyProviderProps > = ({ children }) => {
    const [counterparties, setCounterparties] = useState<Counterparty[]>([]);

    useEffect(() => {
        fetchCounterparties();
    }, []);

    const fetchCounterparties = async () => {
        const response = await axios.get<Counterparty[]>('http://localhost:5000/counterparties');
        setCounterparties(response.data);
    };

    const getCounterparty = async (id: string) => {
        const response = await axios.get<Counterparty>(`http://localhost:5000/counterparties/${id}`);
        return response.data;
    };

    const addCounterparty = async (counterparty: Counterparty) => {
        const response = await axios.post<Counterparty>('http://localhost:5000/counterparties', counterparty);
        setCounterparties((prev: Counterparty[]) => {
            const newCounterparty: Counterparty = response.data as Counterparty; // Response should be of type Counterparty
            return [...prev, newCounterparty];  // Explicitly return a Counterparty[]
        });
    };

    const updateCounterparty = async (counterparty: Counterparty) => {
        const response = await axios.put<Counterparty>(`http://localhost:5000/counterparties/${counterparty.id}`, counterparty);
        setCounterparties((prev) =>
            prev.map((item) => (item.id === counterparty.id ? response.data as Counterparty : item))
        );
    };

    const deleteCounterparty = async (id: string) => {
        await axios.delete(`http://localhost:5000/counterparties/${id}`);
        setCounterparties((prev) => prev.filter((counterparty) => counterparty.id !== id));
    };

    return (
        <CounterpartyContext.Provider value={{ counterparties, getCounterparty, addCounterparty, updateCounterparty, deleteCounterparty }}>
            {children}
        </CounterpartyContext.Provider>
    );
};

export const useCounterpartyContext = () => {
    const context = useContext(CounterpartyContext);
    if (!context) {
        throw new Error('useCounterpartyContext must be used within a CounterpartyProvider');
    }
    return context;
};