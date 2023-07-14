import { IcMFtick, IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function DocumentStatus(finalStatus) {
	switch (finalStatus) {
		case 'in_progress':
			return (
				<div className={styles.in_progress}>
					In Progress...
				</div>
			);

		case 'verified' || 'unverified':
			return (
				<div className={styles.in_progress}>
					Document
					{' '}
					{startCase(finalStatus)}
					!
				</div>
			);

		case 'submitted':
			return (
				<div className={styles.submitted_div}>
					<IcMFtick fill="#DDEBC0" width={20} height={20} />
					<div className={styles.in_submitted}>
						Submitted
					</div>
				</div>
			);

		case 'not_submitted' || 'failed':
			return (
				<div className={styles.submitted_div}>
					<IcMInfo fill="#BF291E" />
					<div className={styles.not_submitted}>
						{startCase(finalStatus)}
					</div>
				</div>
			);

		default:
			return null;
	}
}

export default DocumentStatus;
