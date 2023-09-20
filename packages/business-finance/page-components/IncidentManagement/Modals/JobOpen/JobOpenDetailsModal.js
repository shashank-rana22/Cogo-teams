import { Button } from '@cogoport/components';
import React from 'react';

import styles from './style.module.css';

function JobOpenDetailsModal({ row = {}, setDetailsModal = () => {} }) {
	return (
		<div className={styles.containerDisplay}>
			job open modal
			{row?.referenceId}
			<Button
				size="md"
				themeType="secondary"
				onClick={() => setDetailsModal(null)}
			>
				Close

			</Button>

		</div>
	);
}
export default JobOpenDetailsModal;
