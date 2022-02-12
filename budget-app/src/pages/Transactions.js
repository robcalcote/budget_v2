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

function Transactions() {
	const [transactions, setTransactions] = useState([{}]);

	useEffect(() => {
		fetch('/transactions')
		.then(res => res.json())
		.then(transactions => {
		  setTransactions(transactions.transactions);
		});
	  }, []);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 450 }} aria-label="simple table">
			<TableHead>
				<TableRow>
				<TableCell>Location</TableCell>
				<TableCell>Amount</TableCell>
				<TableCell>Date</TableCell>
				<TableCell>Category</TableCell>
				<TableCell align="right">Edit</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{transactions.map((t, index) => (
				<TableRow
					key={index}
					sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
					<TableCell component="th" scope="row">
					{t.Location}
					</TableCell>
					<TableCell>${t.Amount}</TableCell>
					<TableCell>{t.Date}</TableCell>
					<TableCell>{t.Category}</TableCell>
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

export default Transactions;