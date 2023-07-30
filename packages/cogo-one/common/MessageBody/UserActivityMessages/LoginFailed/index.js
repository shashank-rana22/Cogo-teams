import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const USER_EVENT_TITLE_MAPPING = {
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
				{USER_EVENT_TITLE_MAPPING[name]}

			</div>
			<div className={styles.title}>
				{startCase(data?.error)}
			</div>
			<div className={styles.message}>
				{USER_EVENT_TITLE_MAPPING[name] === 'Login Failed'
					? `If the customer has failed to login multiple times, 
					please contact them to understand the issue and help them resolve it.`
					: null}
			</div>
		</>
	);
}

export default LoginFailed;
