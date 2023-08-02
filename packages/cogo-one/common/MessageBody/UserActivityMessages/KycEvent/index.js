import { startCase } from '@cogoport/utils';

import { getEventTitle } from '../../../../utils/getEventTitle';

import styles from './styles.module.css';

function KycEvent({ data = {}, scope = '', name = '' }) {
	const eventTitle = getEventTitle({ name });

	return (
		<>
			<div className={styles.title}>
				{`${startCase(eventTitle)} on ${startCase(scope)} platform`}
			</div>
			<div className={styles.message}>
				{startCase(data?.error)}
			</div>
			<div className={styles.message}>
				Information on user KYC verification is provided here.
			</div>
		</>
	);
}

export default KycEvent;
