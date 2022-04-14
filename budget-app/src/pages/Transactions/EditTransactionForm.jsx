import React, { useState, useEffect } from "react";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const buttonStyles = {
    backgroundColor: '#6495ED',
    padding: '10 px'
}

const deleteStyles = {
    backgroundColor: '#FF7F7F',
    padding: '10 px'
}

function EditTransactionForm(props) {
    const [tAmount, setTAmount] = useState(props.record.Amount);
	const [tLocation, setTLocation] = useState(props.record.Location);
    const [tDate, setTDate] = useState(props.record.Date);
    const [tCategory, setTCategory] = useState(props.record.CategoryId);
	const [categories, setCategories] = useState([{}]);

	useEffect(() => {
		fetch('/categories')
		.then(res => res.json())
		.then(categories => {
			setCategories(categories);
		});
	}, []);

    function handleTEditSave() {
        let d = new Date(tDate)
        d = d.getFullYear()+"-"+("0" + (d.getMonth() + 1)).slice(-2)+"-"+d.getDate()+" "+d.getHours()+":00:00";
        fetch("/transactions/"+props.record.Id+"/update", {
            method: "PUT",
            body: JSON.stringify({"location": tLocation, "amount": tAmount, "date": d, "categoryId": tCategory}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json()) // Parsing the data into a JavaScript object
        props.refresh(oldKey => oldKey + 1);
        props.onClose();
    };

    function handleTDelete() {
        fetch("/transactions/"+props.record.Id+"/delete", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json()) // Parsing the data into a JavaScript object
        props.refresh(oldKey => oldKey + 1);
        props.onClose();
    };

    const handleTAmountChange = ((e) => {
		setTAmount(e.target.value);
	});

    const handleTLocationChange = ((e) => {
		setTLocation(e.target.value);
	});

    const handleTDateChange = ((newTDate) => {
        setTDate(newTDate);
    });

    const handleTCategoryChange = (event) => {
        setTCategory(event.target.value);
    };

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
            <FormControl fullWidth>
                <InputLabel id="transaction-category-label">Category</InputLabel>
                <Select
                    labelId="transaction-category-label"
                    id="transaction-category"
                    value={tCategory}
                    label="Category"
                    onChange={handleTCategoryChange}
                >
                    {categories.map((c, index) => (
                        <MenuItem key={index} value={c.Id}>{c.Description}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleTEditSave} style={buttonStyles}>Save</Button>
                <Button variant="contained" onClick={handleCloseModal} style={buttonStyles}>Cancel</Button>
                <Button variant="contained" onClick={handleTDelete} style={deleteStyles}>Delete</Button>
            </Stack>
        </Box>
    );
};

export default EditTransactionForm;