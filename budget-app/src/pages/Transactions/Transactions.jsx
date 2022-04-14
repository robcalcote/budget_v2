import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import EditModalButton from '../Generic/EditModalButton'
import GenericModal from '../Generic/GenericModal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const buttonStyles = {
	width: '100%',
	margin: '5px'
}

function Transactions() {
	const [transactions, setTransactions] = useState([{}]);
	const [openCreateModal, setOpenCreateModal] = useState(false);

	useEffect(() => {
		fetch('/transactions')
		.then(res => res.json())
		.then(transactions => {
		  setTransactions(transactions.transactions);
		});
	}, []);

	const handleClose = (() => {
		setOpenCreateModal(false);
	});

	const handleOpen = (() => {
		setOpenCreateModal(true);
	});

	return (
		<>
			<Button variant="outlined" style={buttonStyles} onClick={handleOpen}>
				New Transaction
			</Button>
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
							<EditModalButton t={t} />
						</TableCell>
					</TableRow>
					))}
				</TableBody>
				</Table>
			</TableContainer>
			<GenericModal
				createTransaction={true}
				open={openCreateModal}
				close={handleClose}
			/>
		</>
	);
};

export default Transactions;