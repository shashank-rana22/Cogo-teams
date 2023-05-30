import { Button, Textarea } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

export default function SubmitSection({
	employeeId = '',
	setVisible = () => {},
	onFinalSubmit = () => {},
}) {
	const [finalReview, setFinalReview] = useState('');

	return (
		<div className={styles.popover_inner}>
			<div>
				<h4>Rejection Reason</h4>

				<Textarea
					value={finalReview}
					onChange={(e) => setFinalReview(e)}
					size="lg"
					placeholder="Provide Reason"
				/>
			</div>

			<div
				style={{
					display        : 'flex',
					padding        : '20px 0',
					justifyContent : 'flex-end',
				}}
			>
				<Button
					className={styles.button_submit}
					themeType="secondary"
					onClick={() => setVisible(false)}
				>
					Cancel
				</Button>

				<Button
					className={styles.button_submit}
					themeType="primary"
					onClick={() => onFinalSubmit({
						id               : employeeId,
						status           : 'rejected',
						rejection_reason : finalReview,
					})}
				>
					Confirm
				</Button>
			</div>
		</div>
	);
}
