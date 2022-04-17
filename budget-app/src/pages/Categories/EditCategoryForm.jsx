import React, { useState } from "react";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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

const deleteStyles = {
    backgroundColor: '#FF7F7F',
    padding: '10 px'
}

function EditMonthForm(props) {
    const [cDescription, setCDescription] = useState(props.record.Description);
	const [cExpense, setCExpense] = useState(props.record.Expense);
    const [cRecurring, setCRecurring] = useState(props.record.Recurring);

    function handleCEditSave() {
        const expense = cExpense ? "1" : "0";
        const recurring = cRecurring ? "1" : "0";
        fetch("/categories/"+props.record.Id+"/update", {
            method: "PUT",
            body: JSON.stringify({"description": cDescription, "expense": expense, "recurring": recurring }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json());
        props.refresh(oldKey => oldKey + 1);
        props.onClose();
    };

    function handleCDelete() {
        fetch("/categories/"+props.record.Id+"/delete", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        props.refresh(oldKey => oldKey + 1);
        props.onClose();
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

    const handleCloseModal = () => {
        props.onClose();
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
              Edit Category
            </Typography>
            <TextField
                id="category-edit-description"
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
                <Button variant="contained" onClick={handleCEditSave} style={buttonStyles}>Save</Button>
                <Button variant="contained" onClick={handleCloseModal} style={buttonStyles}>Cancel</Button>
                <Button variant="contained" onClick={handleCDelete} style={deleteStyles}>Delete</Button>
            </Stack>
        </Box>
    );
};

export default EditMonthForm;