import { Textarea, Button, Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';
import React, { useState } from 'react';

import EmployeeData from '../EmployeeDetail';

import styles from './styles.module.css';

function ResignationForm({ setShowModal = () => {}, setCurrentState = () => {} }) {
	const [reason, setReason] = useState('');
	const [error, setError] = useState(false);

	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/create_application',
		method : 'POST',
	}, { manual: true });

	const onClickSubmit = async () => {
		if (!reason) { setError(true); return; }
		setError(false);

		try {
			await trigger({ data: { reason } });

			setCurrentState('ticket_generation');
		} catch (err) {
			if (err?.response) Toast.error(err?.response?.data);
		}
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
				<Button themeType="secondary" onClick={() => setShowModal(false)} disabled={loading}>Cancel</Button>
				<Button
					style={{ marginLeft: 8 }}
					onClick={onClickSubmit}
					loading={loading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default ResignationForm;
