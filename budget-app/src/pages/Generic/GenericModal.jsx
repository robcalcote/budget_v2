import React from "react";

import Box from '@mui/material/Box';
import FormLoader from './FormLoader';
import Modal from '@mui/material/Modal';

const modalStyles = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

function GenericModal(props) {
    return ( 
        <Modal 
            open={props.open}
            onClose={props.close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyles}>
                <FormLoader
                    t={props.t}
                    m={props.m}
                    create={props.create}
                    refresh={props.refresh}
                    edit={props.edit}
                    close={props.close}
                    record={props.record}
                />
            </Box>
        </Modal> 
    );
};

export default GenericModal;