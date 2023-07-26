import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_ARRAY_LENGTH = 10;

function FixedCard({ selectedIds = [] }) {
	const selectedIdsLength = selectedIds.length;
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.text}>
					Selected No. Of Employees :
					<span className={styles.span_text}>
						{' '}
						{selectedIdsLength > DEFAULT_ARRAY_LENGTH ? selectedIdsLength : `0${selectedIdsLength}`}
					</span>
				</div>
			</div>
			<Button size="md">Edit Information</Button>
		</div>
	);
}

export default FixedCard;
