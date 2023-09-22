import { IcMRaiseTicket } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Empty() {
	return (
		<div className={styles.container}>
			<div>
				<IcMRaiseTicket className={styles.icon} />
			</div>
			<div className={styles.label}>
				No feedbacks found

			</div>
		</div>
	);
}

export default Empty;
