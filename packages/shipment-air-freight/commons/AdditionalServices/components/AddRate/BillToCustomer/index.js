import { Button, RadioGroup } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function BillToCustomer({ updateResponse, onCancel = () => {}, onBillToCustomer = () => {} }) {
	const [modeOfReview, setModeOfReview] = useState('bill');

	const { updateBillingInfo, loading } = updateResponse || {};

	const options = [
		{ label: 'Bill to Customer', value: 'bill' },
		{ label: 'Don’t Bill to Customer', value: 'not_bill' },
	];
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Review Services</div>
			<RadioGroup
				options={options || []}
				value={modeOfReview || ''}
				onChange={(item) => setModeOfReview(item)}
			/>
			<div className={styles.button_container}>
				<Button
					onClick={onCancel}
					themeType="secondary"
					style={{ marginRight: 10 }}
				>
					Cancel
				</Button>
				<Button
					onClick={() => {
						if (modeOfReview === 'bill') {
							onBillToCustomer();
						} else {
							updateBillingInfo(modeOfReview);
							onCancel();
						}
					}}
					disabled={loading}
				>
					{modeOfReview === 'bill' ? 'Add Sell Price' : 'Submit'}
				</Button>
			</div>
		</div>
	);
}

export default BillToCustomer;
