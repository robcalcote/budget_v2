import React, { useState } from "react";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const buttonStyles = {
    backgroundColor: '#6495ED',
    padding: '10 px'
}

function EditForm(props) {
    const [transaction, setTransaction] = useState(props.record);
    const [tAmount, setTAmount] = useState(props.record.Amount);
	const [tLocation, setTLocation] = useState(props.record.Location);
    const [tDate, setTDate] = useState(props.record.Date);

    const updateTransaction = (async () => {
        fetch("/transactions/"+props.record.Id+"/update", {
            method: "PUT",
            body: JSON.stringify({"location": tLocation, "amount": tAmount}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json()) // Parsing the data into a JavaScript object
        .then(data => alert(JSON.stringify(data))) // Displaying the stringified data in an alert popup
        props.onClose();
    });

    const handleTAmountChange = ((e) => {
		setTAmount(e.target.value);
	});

    const handleTLocationChange = ((e) => {
		setTLocation(e.target.value);
	});

    const handleTDateChange = ((newTDate) => {
        setTDate(newTDate);
    });

    function handleTEditSave() {
        setTransaction({
            "location": tLocation,
            "amount": tAmount,
            "date": tDate,
        })
        updateTransaction();
    }

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
            <Typography variant="h4" color="inherit" component="div">
              Edit Transaction
            </Typography>
            <TextField
                id="transaction-edit-location"
                label="Location"
                name="Location"
                variant="outlined"
                value={tLocation}
                onChange={handleTLocationChange}
            />
            <TextField
                id="transaction-edit-amount"
                label="Amount"
                name="Amount"
                variant="outlined"
                type="number"
                value={tAmount}
                onChange={handleTAmountChange}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    id="transaction-edit-date"
                    label="Date"
                    name="Date"
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
                <Button variant="contained" onClick={handleTEditSave} style={buttonStyles}>Save</Button>
                <Button variant="contained" onClick={handleCloseModal} style={buttonStyles}>Cancel</Button>
            </Stack>
        </Box>
    );
};

export default EditForm;