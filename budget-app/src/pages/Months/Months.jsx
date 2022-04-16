import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import EditModalButton from '../Generic/EditModalButton'
import GenericModal from '../Generic/GenericModal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const buttonStyles = {
	width: '100%',
	margin: '5px'
}

function Months() {
	const [months, setMonths] = useState([{}]);
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);

	useEffect(() => {
		fetch('/months')
		.then(res => res.json())
		.then(months => {
			setMonths(months.months);
		});
	}, [refreshKey]);

	const handleClose = (() => {
		setOpenCreateModal(false);
	});

	const handleOpen = (() => {
		setOpenCreateModal(true);
	});

	return (
		<>
			<Button variant="outlined" style={buttonStyles} onClick={handleOpen}>
				New Month
			</Button>
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
								<EditModalButton 
									m={m} 
									refresh={setRefreshKey}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				</Table>
			</TableContainer>
			<GenericModal
				create={'month'}
				open={openCreateModal}
				refresh={setRefreshKey}
				close={handleClose}
			/>
		</>
  );
};

export default Months;