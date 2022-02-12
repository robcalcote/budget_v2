import React, { useState, useEffect } from "react";
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
				<TableCell align="right">Year</TableCell>
				<TableCell align="right">Projected</TableCell>
				<TableCell align="right">Actual</TableCell>
				<TableCell align="right">Savings</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{months.map((m, index) => (
				<TableRow
					key={index}
					sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
					<TableCell component="th" scope="row">{m.Month}</TableCell>
					<TableCell align="right">{m.Year}</TableCell>
					<TableCell align="right">${m.Projected}</TableCell>
					<TableCell align="right">${m.Actual}</TableCell>
					<TableCell align="right">${m.Savings}</TableCell>
				</TableRow>
				))}
			</TableBody>
			</Table>
		</TableContainer>
  )
};

export default Months;