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
                t={props.t}
                m={props.m}
                c={props.c}
                record={props.t || props.m || props.c}
                edit={true}
                open={openModal}
                refresh={props.refresh}
                close={handleModalClose}
            />
        </React.Fragment>
    );
};

export default EditModalButton;