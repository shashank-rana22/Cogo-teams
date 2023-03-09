import { IcMFtick, IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function DocumentStatus(finalStatus) {
	switch (finalStatus) {
		case 'in_progress':
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

		case 'unverified':
			return (
				<div className={styles.in_progress}>
					Document Unverified!
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

		case 'not_submitted':
			return (
				<div className={styles.submitted_div}>
					<IcMInfo fill="#BF291E" />
					<div className={styles.not_submitted}>
						Not submitted
					</div>
				</div>
			);

		case 'failed':
			return (

				<div className={styles.submitted_div}>
					<IcMInfo fill="#BF291E" />
					<div className={styles.not_submitted}>
						Failed
					</div>
				</div>
			);

		default:
			return null;
	}
}

export default DocumentStatus;
