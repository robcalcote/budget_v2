import React from "react";

import CreateForm from './CreateForm'
import EditMonthForm from './EditMonthForm';
import EditTransactionForm from './EditTransactionForm';

function FormLoader(props) {
    if (props.t) {
        if (props.create) {
            return (<CreateForm close={props.close} />);
        }
        if (props.edit) {
            return (<EditTransactionForm record={props.record} onClose={props.close} />);
        }
    }
    if (props.m) {
        if (props.edit) {
            return (<EditMonthForm record={props.record} onClose={props.close} />);
        }
    }
}

export default FormLoader;