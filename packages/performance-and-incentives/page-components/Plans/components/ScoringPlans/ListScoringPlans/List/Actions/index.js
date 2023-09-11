import { IcMCross, IcMEdit } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Actions() {
	return (
		<div className={styles.action_container}>
			<div className={styles.workflow_cta}>
				<div className={styles.cta_text}>
					<IcMEdit width={20} height={20} style={{ marginRight: '8px' }} />
					Edit
				</div>
			</div>

			<div className={styles.workflow_cta}>
				<div className={styles.cta_text}>
					<IcMCross width={20} height={20} style={{ marginRight: '8px' }} />
					Inactive
				</div>
			</div>
		</div>
	);
}

export default Actions;
