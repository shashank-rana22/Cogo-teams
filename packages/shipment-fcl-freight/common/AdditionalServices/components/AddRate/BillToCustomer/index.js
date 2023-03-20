import { Button, RadioGroup } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function BillToCustomer({ updateDatas, onCancel, onBillToCustomer }) {
	const [modeOfReview, setModeOfReview] = useState('bill');
	const { updateBillingInfo } = updateDatas || {};
	const options = [
		{ label: 'Bill to Customer', value: 'bill' },
		{ label: 'Don’t Bill to Customer', value: 'not_bill' },
	];
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Review Services</div>
			<RadioGroup
				className="primary lg"
				options={options || []}
				value={modeOfReview || ''}
				onChange={(item) => setModeOfReview(item)}
			/>
			<Button
				onClick={onCancel}
				className="secondary md"
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
					}
				}}
			>
				{modeOfReview === 'bill' ? 'Add Sell Price' : 'Submit'}
			</Button>
		</div>
	);
}

export default BillToCustomer;
