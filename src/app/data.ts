type Counterparty = {
    id: number;
    name: string;
    inn: number;
    kpp: number;
    address: string;
}

export {
    Counterparty
}

export const counterparties: Counterparty[] = [
    {
        id: 1,
        name: '1',
        inn: 1231231231,
        kpp: 123123123,
        address: 'This is the first item'
    },
    {
        id: 2,
        name: '2',
        inn: 2231233333,
        kpp: 223123222,
        address: 'This is the second item'
    },
];