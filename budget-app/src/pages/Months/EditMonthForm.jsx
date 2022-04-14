import React, { useState } from "react";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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

function EditMonthForm(props) {
    const [mMonth, setMMonth] = useState(props.record.Month);
	const [mYear, setMYear] = useState(props.record.Year);
    const [mProjected, setMProjected] = useState(props.record.Projected);
    const [mActual, setMActual] = useState(props.record.Actual);
	const [mSavings, setMSavings] = useState(props.record.Savings);

    function handleMEditSave() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const numMonth = months.indexOf(mMonth);
        let d = new Date(mYear, numMonth, 1)
        fetch("/months/"+props.record.Id+"/update", {
            method: "PUT",
            body: JSON.stringify({"month": numMonth+1, "year": mYear, "projected": mProjected, "actual": mActual, "savings": mSavings}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json()
        );
        props.onClose();
    };

    function handleMDelete() {
        fetch("/months/"+props.record.Id+"/delete", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        props.onClose();
    };

    const handleMMonthChange = ((e) => {
		setMMonth(e.target.value);
	});

    const handleMYearChange = ((e) => {
		setMYear(e.target.value);
	});

    const handleMProjectedChange = ((e) => {
        setMProjected(e.target.value);
    });

    const handleMActualChange = (e) => {
        setMActual(e.target.value);
    };

    const handleMSavingsChange = (e) => {
        setMSavings(e.target.value);
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
              Edit Month
            </Typography>
            <TextField
                id="month-edit-month"
                label="Month"
                name="Month"
                variant="outlined"
                value={mMonth}
                onChange={handleMMonthChange}
            />
            <TextField
                id="month-edit-year"
                label="Year"
                name="Year"
                variant="outlined"
                type="number"
                value={mYear}
                onChange={handleMYearChange}
            />
            <TextField
                id="month-edit-projected"
                label="Projected"
                name="Projected"
                variant="outlined"
                type="number"
                value={mProjected}
                onChange={handleMProjectedChange}
            />
            <TextField
                id="month-edit-actual"
                label="Actual"
                name="Actual"
                variant="outlined"
                type="number"
                value={mActual}
                onChange={handleMActualChange}
            />
            <TextField
                id="month-edit-savings"
                label="Savings"
                name="Savings"
                variant="outlined"
                type="number"
                value={mSavings}
                onChange={handleMSavingsChange}
            />
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleMEditSave} style={buttonStyles}>Save</Button>
                <Button variant="contained" onClick={handleCloseModal} style={buttonStyles}>Cancel</Button>
                <Button variant="contained" onClick={handleMDelete} style={deleteStyles}>Delete</Button>
            </Stack>
        </Box>
    );
};

export default EditMonthForm;