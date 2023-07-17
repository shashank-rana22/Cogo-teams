import { startCase } from '@cogoport/utils';

import { USER_EVENT_MAPPING } from '../../../../constants/userEventMapping';

import styles from './styles.module.css';

function LoginFailed({ name = '', data = {}, scope = '' }) {
	return (
		<>
			<div className={styles.title}>
				{startCase(scope)}
				{' '}
				{USER_EVENT_MAPPING[name]}

			</div>
			<div className={styles.message}>
				{startCase(data?.error)}
			</div>
		</>
	);
}

export default LoginFailed;
