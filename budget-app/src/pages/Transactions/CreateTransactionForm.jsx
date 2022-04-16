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

function CreateForm(props) {
    const [tAmount, setTAmount] = useState('');
	const [tLocation, setTLocation] = useState('');
    const [tDate, setTDate] = useState(new Date());
    const [tCategory, setTCategory] = useState('');
	const [categories, setCategories] = useState([{}]);

	useEffect(() => {
		fetch('/categories')
		.then(res => res.json())
		.then(categories => {
			setCategories(categories);
		});
	}, []);

    function handleTCreateSave() {
        let d = new Date(tDate)
        d = d.getFullYear()+"-"+("0" + (d.getMonth() + 1)).slice(-2)+"-"+d.getDate()+" "+d.getHours()+":00:00";
        fetch("/transactions/create", {
            method: "POST",
            body: JSON.stringify({"location": tLocation, "amount": tAmount, "date": d, "categoryId": tCategory, }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json()) // Parsing the data into a JavaScript object
        props.refresh(oldKey => oldKey + 1);
        props.close();
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
              Create Transaction
            </Typography>
            <TextField
                id="transaction-create-location"
                label="Location"
                name="Location"
                variant="outlined"
                value={tLocation}
                onChange={handleTLocationChange}
            />
            <TextField
                id="transaction-create-amount"
                label="Amount"
                name="Amount"
                variant="outlined"
                type="number"
                value={tAmount}
                onChange={handleTAmountChange}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    id="transaction-create-date"
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
                    id="transaction-create-category"
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
                <Button variant="contained" onClick={handleTCreateSave} style={buttonStyles}>Save</Button>
                <Button variant="contained" onClick={props.close} style={buttonStyles}>Cancel</Button>
            </Stack>
        </Box>
    );
};

export default CreateForm;