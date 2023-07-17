import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

export const USER_EVENT_MAPPING = {
	'System: Auth: Partner User Login Failed'      : 'Login Failed',
	'System: Auth: App User Login Failed'          : 'Login Failed',
	'System: Auth: Partner Lead User Login Failed' : 'Login Failed',
	'System: Auth: App Lead User Login Failed'     : 'Login Failed',
	'System: Auth: Partner user logged in'         : 'Logged In',
	'System: Auth: App user logged in'             : 'Logged In',
};

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
