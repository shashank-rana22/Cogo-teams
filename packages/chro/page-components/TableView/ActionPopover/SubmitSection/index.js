import { Button, Textarea } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

export default function SubmitSection({
	setVisible = () => {},
}) {
	const [finalReview, setFinalReview] = useState('');

	const onBack = () => {
		setVisible(false);
	};

	return (
		<div className={styles.popover_inner}>
			<div>
				<h4>Please provide a reason</h4>

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
					onClick={onBack}
				>
					Go Back
				</Button>

				<Button
					className={styles.button_submit}
					themeType="primary"
				>
					Confirm
				</Button>
			</div>
		</div>
	);
}
