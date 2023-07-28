import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function SinupEvents({ data = {}, scope = '' }) {
	return (
		<>
			<div className={styles.title}>
				Customer Abandoned The Sign Up Process on
				{' '}
				{startCase(scope)}
				{' '}
				Platform
			</div>
			<div className={styles.message}>
				{startCase(data?.error)}
			</div>
			<div className={styles.message}>
				Please contact the customer to understand their concerns and help them proceed with the sign up journey
			</div>
		</>
	);
}

export default SinupEvents;
