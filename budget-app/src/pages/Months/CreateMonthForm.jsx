import React, { useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const buttonStyles = {
    backgroundColor: '#6495ED',
    padding: '10 px'
}

const date = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function CreateForm(props) {
    const [mMonth, setMMonth] = useState(date.getMonth());
	const [mYear, setMYear] = useState(date.getFullYear());
    const [mProjected, setMProjected] = useState(0);
    const [mActual, setMActual] = useState(0);
	const [mSavings, setMSavings] = useState(0);

    function handleMCreateSave() {
        fetch("/months/create", {
            method: "POST",
            body: JSON.stringify({"month": mMonth+1, "year": mYear, "projected": mProjected, "actual": mActual, "savings": mSavings}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json()); // Parsing the data into a JavaScript object
        props.refresh(oldKey => oldKey + 1);
        props.close();
    };

    const handleMMonthChange = (e) => {
		setMMonth(e.target.value);
	};

    const handleMYearChange = (e) => {
		setMYear(e.target.value);
	};

    const handleMProjectedChange = (e) => {
        setMProjected(e.target.value);
    };

    const handleMActualChange = (e) => {
        setMActual(e.target.value);
    };

    const handleMSavingsChange = (e) => {
        setMSavings(e.target.value);
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
              Create Month
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="month-month-label">Month</InputLabel>
                <Select
                    labelId="month-month-label"
                    id="month-create-month"
                    value={mMonth}
                    label="Month"
                    onChange={handleMMonthChange}
                >
                    {months.map((m, index) => (
                        <MenuItem key={index} value={months.indexOf(m)}>{m}</MenuItem>
                    ))}               
                </Select>
            </FormControl>
            <TextField
                id="month-create-year"
                label="Year"
                name="Year"
                variant="outlined"
                type="number"
                value={mYear}
                onChange={handleMYearChange}
            />
            <TextField
                id="month-create-projected"
                label="Projected"
                name="Projected"
                variant="outlined"
                type="number"
                value={mProjected}
                onChange={handleMProjectedChange}
            />            
            <TextField
                id="month-create-actual"
                label="Actual"
                name="Actual"
                variant="outlined"
                type="number"
                value={mActual}
                onChange={handleMActualChange}
            />           
            <TextField
                id="month-create-savings"
                label="Savings"
                name="Savings"
                variant="outlined"
                type="number"
                value={mSavings}
                onChange={handleMSavingsChange}
            />
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleMCreateSave} style={buttonStyles}>Save</Button>
                <Button variant="contained" onClick={props.close} style={buttonStyles}>Cancel</Button>
            </Stack>
        </Box>
    );
};

export default CreateForm;