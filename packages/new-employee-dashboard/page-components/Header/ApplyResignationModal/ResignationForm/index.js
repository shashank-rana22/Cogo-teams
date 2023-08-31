import { Textarea, Button } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function ResignationForm({ setShowModal = () => {} }) {
	const [reason, setReason] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.title}>Enter Reason of Leaving</div>

			<Textarea
				placeholder="Type here..."
				value={reason}
				onChange={setReason}
			/>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
				<Button style={{ marginLeft: 8 }}>Submit</Button>
			</div>
		</div>
	);
}

export default ResignationForm;
