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

function Months() {
	const [months, setMonths] = useState([{}]);

	useEffect(() => {
		fetch('/months')
		.then(res => res.json())
		.then(months => {
			setMonths(months.months);
		});
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
			<TableHead>
				<TableRow>
				<TableCell>Month</TableCell>
				<TableCell>Year</TableCell>
				<TableCell>Projected</TableCell>
				<TableCell>Actual</TableCell>
				<TableCell>Savings</TableCell>
				<TableCell align="right">Edit</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{months.map((m, index) => (
				<TableRow
					key={index}
					sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
					<TableCell component="th" scope="row">{m.Month}</TableCell>
					<TableCell>{m.Year}</TableCell>
					<TableCell>${m.Projected}</TableCell>
					<TableCell>${m.Actual}</TableCell>
					<TableCell>${m.Savings}</TableCell>
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
  );
};

export default Months;