import React from "react";
import {Table} from "./components/table/table";
import {Footer} from "./components/footer/footer";
import {CounterpartyProvider} from "./context/CounterpartyContext";

const App = () => {
    return <>
        <CounterpartyProvider>
            <Table />
        </CounterpartyProvider>
        <Footer></Footer>
    </>;
}

export default App;