import React, { useState } from "react";
import { Link } from "react-router-dom";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const buttonStyles = {
    backgroundColor: '#6495ED',
    padding: '10 px'
  }

  const linkStyles = {
    color: '#000000',
    textDecoration: 'none'
  }

function EditForm(props) {
    const [transaction, setTransaction] = useState(props.record);
    const [tAmount, setTAmount] = useState(props.record.Amount);
	const [tLocation, setTLocation] = useState(props.record.Location);
    const [tDate, setTDate] = useState(props.record.Date);


    const handleTAmountChange = ((e) => {
		setTAmount(e.target.value);
	});

    const handleTLocationChange = ((e) => {
		setTLocation(e.target.value);
	});

    const handleTDateChange = ((newTDate) => {
        setTDate(newTDate);
    });

    const handleTEditSave = (() => {
        fetch("http://localhost:5000/transactions/"+props.record.Id+"/update")
        .then(res=>res.json())
        .then(data => {
            setTransaction(data);
        });

        props.onClose();
    });

    const handleCloseModal = (() => {
        props.onClose();
    });

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '45ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField
                id="transaction-edit-location"
                label="Location"
                variant="outlined"
                value={tLocation}
                onChange={handleTLocationChange}
            />
            <TextField
                id="transaction-edit-amount"
                label="Amount"
                variant="outlined"
                type="number"
                value={tAmount}
                onChange={handleTAmountChange}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    id="transaction-edit-date"
                    label="Date"
                    value={tDate}
                    onChange={handleTDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <TextField
                id="transaction-edit-category"
                label="Category"
                variant="outlined"
                value={props.record.Category}
            />
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleTEditSave}>Save</Button>
                <Button variant="contained" onClick={handleCloseModal}>Cancel</Button>
            </Stack>
        </Box>
    );
};

export default EditForm;