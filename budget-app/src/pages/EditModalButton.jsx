import React, { useState, useEffect } from "react";

import GenericModal from './GenericModal'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function EditModalButton(props) {
    const [openModal, setOpenModal] = useState(false);
    const [transaction, setTransaction] = useState({})

    useEffect(() => {
        fetch("/transactions/"+props.t.Id)
        .then(res => res.json())
        .then(transaction => {
            setTransaction(transaction.transactions);
        });
	}, []);

    const handleModalClose = (() => {
		setOpenModal(false);
	});

    const handleModalOpen = (() => {
        // THIS IS A BUG -- it's a hack to get the first transaction data to load in edit modal
        // lines 27 - 33 are added because for whatever reason, data isn't loading for the first record on the page (Id #1)
        // (requires opening it once and closing it once. I am not sure what the bug is, but I'll fix it when I'm not so tired.)
        if (props.t.Id === 1) {
            fetch("/transactions/"+props.t.Id)
            .then(res => res.json())
            .then(transaction => {
                setTransaction(transaction.transactions);
            });
        }
        setOpenModal(true);
	});

    return (
        <div>
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
                record={transaction}
                edit={true}
                open={openModal}
                close={handleModalClose}
            />
        </div>
    );
};

export default EditModalButton;