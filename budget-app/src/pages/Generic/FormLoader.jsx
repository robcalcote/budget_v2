import React from "react";

import CreateMonthForm from '../Months/CreateMonthForm';
import CreateTransactionForm from '../Transactions/CreateTransactionForm';
import EditMonthForm from '../Months/EditMonthForm';
import EditTransactionForm from '../Transactions/EditTransactionForm';

function FormLoader(props) {
    if (props.create === 'transaction') {
        return (<CreateTransactionForm close={props.close} refresh={props.refresh} />);
    }
    if (props.create === 'month') {
        return (<CreateMonthForm close={props.close} refresh={props.refresh} />);
    }
    if (props.t) {
        return (<EditTransactionForm record={props.record} onClose={props.close} refresh={props.refresh} />);
    }
    if (props.m) {
        return (<EditMonthForm record={props.record} onClose={props.close} refresh={props.refresh} />);
    }
}

export default FormLoader;