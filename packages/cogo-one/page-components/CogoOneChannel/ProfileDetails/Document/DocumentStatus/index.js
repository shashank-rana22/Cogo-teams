import { IcCFtick, IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function DocumentStatus(status) {
	switch (status) {
		case 'progress':
			return (
				<div className={styles.in_progress}>
					In Progress...
				</div>
			);

		case 'verified':
			return (
				<div className={styles.in_progress}>
					Document verified!
				</div>

			);

		case 'submitted':
			return (
				<div className={styles.submitted_div}>
					<IcCFtick fill="#DDEBC0" />
					<div className={styles.in_submitted}>
						Submitted
					</div>
				</div>
			);

		case 'not_submitted':
			return (
				<div className={styles.submitted_div}>
					<IcMInfo fill="#BF291E" />
					<div className={styles.not_submitted}>
						Not submitted
					</div>
				</div>
			);

		default:
			return null;
	}
}

export default DocumentStatus;
