import React from "react";

import CreateForm from './CreateForm'
import EditForm from './EditForm';

function FormLoader(props) {
    if (props.create) {
        return (<CreateForm close={props.close} />);
    }
    if (props.edit) {
        return (<EditForm record={props.record} onClose={props.close} />);
    }
}

export default FormLoader;