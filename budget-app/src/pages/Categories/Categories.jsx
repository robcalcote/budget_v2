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

function Categories() {
	const [categories, setCategories] = useState([{}]);
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);

	useEffect(() => {
		fetch('/categories')
		.then(res => res.json())
		.then(categories => {
			setCategories(categories);
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
				New Category
			</Button>
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
						<TableCell>{c.Expense === 1 ? "X" : null}</TableCell>
						<TableCell>{c.Recurring === 1 ? "X" : null}</TableCell>
						<TableCell align="right">
							<EditModalButton 
								c={c} 
								refresh={setRefreshKey}
							/>							
						</TableCell>
					</TableRow>
					))}
				</TableBody>
				</Table>
			</TableContainer>
			<GenericModal
				create={'category'}
				open={openCreateModal}
				refresh={setRefreshKey}
				close={handleClose}
			/>
		</>
	);
};

export default Categories;