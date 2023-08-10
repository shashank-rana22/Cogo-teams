import { Button, RadioGroup } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

const OPTIONS = [
	{ label: 'Bill to Customer', value: 'bill' },
	{ label: 'Don’t Bill to Customer', value: 'not_bill' },
];

function BillToCustomer({ updateResponse, onCancel, onBillToCustomer }) {
	const [modeOfReview, setModeOfReview] = useState('bill');
	const { updateBillingInfo } = updateResponse || {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Review Services</div>
			<RadioGroup
				options={OPTIONS || []}
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
							onBillToCustomer(true);
						} else {
							updateBillingInfo(modeOfReview);
							onCancel();
						}
					}}
				>
					{modeOfReview === 'bill' ? 'Add Sell Price' : 'Submit'}
				</Button>
			</div>
		</div>
	);
}

export default BillToCustomer;
