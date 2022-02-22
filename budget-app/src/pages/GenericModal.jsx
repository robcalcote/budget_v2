import React from "react";

import Box from '@mui/material/Box';
import CreateForm from './CreateForm'
import EditForm from './EditForm';
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
    if (props.create) {
        return (
            <Modal
                open={props.open}
                onClose={props.close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyles}>
                    <CreateForm 
                        close={props.close}
                    />
                </Box>
            </Modal>
        );
    }
    if (props.edit) {
        return (
            <Modal
                open={props.open}
                onClose={props.close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyles}>
                    <EditForm
                        record={props.record}
                        onClose={props.close}
                    />
                </Box>
            </Modal>
        );
    }
};

export default GenericModal;