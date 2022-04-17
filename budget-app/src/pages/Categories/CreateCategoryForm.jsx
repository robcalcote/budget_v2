import React, { useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const buttonStyles = {
    backgroundColor: '#6495ED',
    padding: '10 px'
}

function CreateForm(props) {
    const [cDescription, setCDescription] = useState('');
	const [cExpense, setCExpense] = useState(true);
    const [cRecurring, setCRecurring] = useState(false);

    function handleTCreateSave() {
        const expense = cExpense ? "1" : "0";
        const recurring = cRecurring ? "1" : "0";
        fetch("/categories/create", {
            method: "POST",
            body: JSON.stringify({"description": cDescription, "expense": expense, "recurring": recurring }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json()) // Parsing the data into a JavaScript object
        props.refresh(oldKey => oldKey + 1);
        props.close();
    };

    const handleCDescriptionChange = (e) => {
		setCDescription(e.target.value);
	};

    const handleCExpenseChange = () => {
        setCExpense(!cExpense);
    };

    const handleCRecurringChange = () => {
        setCRecurring(!cRecurring);
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
              Create Category
            </Typography>
            <TextField
                id="category-create-description"
                label="Description"
                name="Description"
                variant="outlined"
                value={cDescription}
                onChange={handleCDescriptionChange}
            />
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={cExpense} onChange={handleCExpenseChange} />} label="Expense" />
                <FormControlLabel control={<Checkbox checked={cRecurring} onChange={handleCRecurringChange} />} label="Recurring" />
            </FormGroup>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleTCreateSave} style={buttonStyles}>Save</Button>
                <Button variant="contained" onClick={props.close} style={buttonStyles}>Cancel</Button>
            </Stack>
        </Box>
    );
};

export default CreateForm;