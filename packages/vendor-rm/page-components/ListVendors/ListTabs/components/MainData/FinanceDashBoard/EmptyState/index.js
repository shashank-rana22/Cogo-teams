import { IcMTaskNotCompleted } from '@cogoport/icons-react';
import React from 'react';

import styles from '../styles.module.css';

function EmptyState() {
	return (
		<div className={styles.empty_container}>
			<IcMTaskNotCompleted height={72} width={72} />
			<div className={styles.no_record_text}>
				No Record Found !
			</div>
		</div>
	);
}

export default EmptyState;
