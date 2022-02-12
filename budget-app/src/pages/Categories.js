import React, { useState, useEffect } from "react";
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
				<TableCell align="right">Expense</TableCell>
				<TableCell align="right">Recurring</TableCell>
				<TableCell align="right">Edit</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{categories.map((c) => (
				<TableRow
					key={c.Id}
					sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
					<TableCell component="th" scope="row">
					{c.Description}
					</TableCell>
					<TableCell align="right">{c.Expense}</TableCell>
					<TableCell align="right">{c.Recurring}</TableCell>
					<TableCell align="right">Edit</TableCell>
				</TableRow>
				))}
			</TableBody>
			</Table>
		</TableContainer>
	)
};

export default Categories;