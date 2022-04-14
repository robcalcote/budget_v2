import React from "react";

import CreateForm from '../Transactions/CreateForm'
import EditMonthForm from '../Months/EditMonthForm';
import EditTransactionForm from '../Transactions/EditTransactionForm';

function FormLoader(props) {
    if (props.createTransaction) {
        return (<CreateForm close={props.close} />);
    }
    if (props.t) {
        return (<EditTransactionForm record={props.record} onClose={props.close} />);
    }
    if (props.m) {
        return (<EditMonthForm record={props.record} onClose={props.close} />);
    }
}

export default FormLoader;