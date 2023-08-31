import { Textarea, Button } from '@cogoport/components';
import React, { useState } from 'react';

import EmployeeData from '../EmployeeDetail';

import styles from './styles.module.css';

function ResignationForm({ setShowModal = () => {} }) {
	const [reason, setReason] = useState('');
	const [error, setError] = useState(false);

	const onClickSubmit = () => {
		if (!reason) { setError(true); return; }
		setError(false);

		console.log('reason :: ', reason);
	};

	return (
		<div className={styles.container}>
			<EmployeeData />

			<div className={styles.title}>Enter Reason of Leaving</div>
			<Textarea
				placeholder="Type here..."
				value={reason}
				onChange={(e) => {
					setReason(e);
					if (error) setError(false);
				}}
			/>
			{error ? <div className={styles.error}>Reason is required</div> : null}

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
				<Button style={{ marginLeft: 8 }} onClick={onClickSubmit}>Submit</Button>
			</div>
		</div>
	);
}

export default ResignationForm;
