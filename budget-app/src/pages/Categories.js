import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Categories() {
	const [categories, setCategories] = useState([{}]);

	useEffect(() => {
		fetch('/categories')
		.then(res => res.json())
		.then(categories => {
			setCategories(categories);
		});
	  }, []);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 450 }} aria-label="simple table">
			<TableHead>
				<TableRow>
				<TableCell>Description</TableCell>
				<TableCell>Expense</TableCell>
				<TableCell>Recurring</TableCell>
				<TableCell align="right">Edit</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{categories.map((c, index) => (
				<TableRow
					key={index}
					sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
					<TableCell component="th" scope="row">
					{c.Description}
					</TableCell>
					<TableCell>{c.Expense == 1 ? "X" : null}</TableCell>
					<TableCell>{c.Recurring == 1 ? "X" : null}</TableCell>
					<TableCell align="right">
						<IconButton aria-label="edit" size="small">
							<ModeEditIcon fontSize="inherit" />
						</IconButton>
					</TableCell>
				</TableRow>
				))}
			</TableBody>
			</Table>
		</TableContainer>
	)
};

export default Categories;