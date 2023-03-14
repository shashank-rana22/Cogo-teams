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
				<div className={`${styles.pill} ${state}`}>
					<div className={`${styles.text} ${state}`}>{statusText}</div>
				</div>
			</div>

			{payment_term ? (
				<div className={styles.payment_status}>
					<div className={styles.payment_text}>Payment Term: </div>

					<div className={`${styles.collect} ${state}`}>
						{startCase(payment_term)}
						{' '}
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Status;
