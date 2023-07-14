import { startCase } from '@cogoport/utils';

import { USER_EVENT_MAPPING } from '../../../../constants/userEventMapping';

import styles from './styles.module.css';

function LoginFailed({ name = '', data = {} }) {
	return (
		<>
			<div className={styles.title}>{USER_EVENT_MAPPING[name]}</div>
			<div className={styles.message}>
				{startCase(data?.error)}
			</div>
		</>
	);
}

export default LoginFailed;
