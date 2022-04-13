import React, { useState } from "react";

import GenericModal from './GenericModal'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function EditModalButton(props) {
    const [openModal, setOpenModal] = useState(false);

    const handleModalClose = (() => {
		setOpenModal(false);
	});

    const handleModalOpen = (() => {
        setOpenModal(true);
	});

    return (
        <React.Fragment>
            <IconButton
                aria-label="edit"
                size="small"
                onClick={handleModalOpen}
            >
                <ModeEditIcon 
                    fontSize="inherit"
                />
            </IconButton>
            <GenericModal
                record={props.t}
                edit={true}
                open={openModal}
                close={handleModalClose}
            />
        </React.Fragment>
    );
};

export default EditModalButton;