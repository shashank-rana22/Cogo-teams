import { cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Status({ state, payment_term }) {
	let statusText = startCase(state);
	if (state === 'init') {
		statusText = 'Not Allocated';
	}

	return (
		<div className={styles.container}>
			<div className={styles.pill_main}>
				<div className={cl`${styles.pill} ${state}`}>
					<div className={cl`${styles.text} ${state}`}>{statusText}</div>
				</div>
			</div>

			{payment_term ? (
				<div className={styles.payment_status}>
					<div className={styles.payment_text}>Payment Term: </div>

					<div className={cl`${styles.collect} ${state}`}>
						{startCase(payment_term)}
						&nbsp;
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Status;
