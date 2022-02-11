import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Transactions() {
	const [transactions, setTransactions] = useState([{}]);

	useEffect(() => {
		fetch('/transactions')
		.then(res => res.json())
		.then(transactions => {
		  setTransactions(transactions);
		});
	  }, []);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 450 }} aria-label="simple table">
			<TableHead>
				<TableRow>
				<TableCell>Location</TableCell>
				<TableCell align="right">Amount</TableCell>
				<TableCell align="right">Date</TableCell>
				<TableCell align="right">Category</TableCell>
				<TableCell align="right">Edit</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{transactions.map((t) => (
				<TableRow
					key={t.Id}
					sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
					<TableCell component="th" scope="row">
					{t.Location}
					</TableCell>
					<TableCell align="right">{t.Amount}</TableCell>
					<TableCell align="right">{t.Date}</TableCell>
					<TableCell align="right">{t.CategoryId}</TableCell>
					<TableCell align="right">Edit</TableCell>
				</TableRow>
				))}
			</TableBody>
			</Table>
		</TableContainer>
  )
};

export default Transactions;