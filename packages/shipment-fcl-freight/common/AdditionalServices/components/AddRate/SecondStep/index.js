import { Button, Textarea } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function SecondStep({ item, setSecondStep, updateResponse, onCancel = () => {} }) {
	const {
		handleShipperRevision,
		remarks,
		setRemarks,
	} = updateResponse;

	return (
		<div>
			<div className={styles.container_header}>
				{item.name}
				(
				{startCase(item.service_type)}
				)
			</div>

			<div className={styles.warning}>* Please tell us the reason for this change.</div>

			<Textarea
				placeholder="Type here..."
				value={remarks}
				onChange={(e) => setRemarks(e)}
			/>

			<div className={styles.button_container}>
				<Button
					onClick={() => setSecondStep(false)}
					themeType="secondary"
				>
					GO BACK
				</Button>

				<Button
					onClick={handleShipperRevision}
				>
					REQUEST CHANGES
				</Button>
			</div>
		</div>
	);
}

export default SecondStep;
