import React, { useState } from "react";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import EditForm from './EditForm';
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

function EditModal(props) {
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleClose = (() => {
		setOpenEditModal(false);
	});

    const handleOpen = (() => {
		setOpenEditModal(true);
	});

    return (
        <div>
            <IconButton
                aria-label="edit"
                size="small"
                onClick={handleOpen}
            >
                <ModeEditIcon 
                    fontSize="inherit"
                    open={openEditModal}
                />
            </IconButton>
            <Modal
                open={openEditModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyles}>
                    <EditForm
                        record={props.record}
                        onClose={handleClose}
                    />
                </Box>
            </Modal>
        </div>
    );
};

export default EditModal;