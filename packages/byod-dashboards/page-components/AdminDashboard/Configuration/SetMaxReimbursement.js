import { Button, RadioGroup, Input } from '@cogoport/components';
import React from 'react';

import useUpdateDeviceDetails from '../../../hooks/useUpdateDeviceDetails';

import styles from './styles.module.css';

const OPTIONS = [
	{ value: 'yes', label: 'Yes' },
	{ value: 'no', label: 'No' },
];

function SetMaxReimbursement(
	{ id, setCombinedValue, combinedValue, setMaxReimbursementAmount, maxReimbursementAmount },
) {
	const { updateDeviceDetails } = useUpdateDeviceDetails({ SOURCE: 'maxreimbursement', id });
	return (
		<div className={styles.footer_container}>
			<div className={styles.set_combined_reimbusement}>
				<div className={styles.text_container}>
					Do you want to set combined maximum reimbursement ?
				</div>

				<RadioGroup
					style={{ marginTop: '-10px' }}
					options={OPTIONS}
					onChange={(e) => setCombinedValue(e)}
					value={combinedValue}
				/>
			</div>
			{(combinedValue === 'yes') && (
				<div className={styles.combined_reimbusement}>
					<div className={styles.combined_reimbusement_body}>

						<div className={styles.select_categories}>
							<div className={styles.text_container}>
								Max Reimbursement
							</div>
							<Input
								placeholder="Max Reimbursement"
								onChange={(val) => setMaxReimbursementAmount(parseFloat(val))}
								value={maxReimbursementAmount}
								type="number"
							/>
						</div>
					</div>
				</div>
			)}
			<Button
				style={{ marginLeft: '10px' }}
				onClick={() => updateDeviceDetails({ maxReimbursementAmount })}
			>
				{' '}
				Save

			</Button>
		</div>

	);
}

export default SetMaxReimbursement;
