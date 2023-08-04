import { startCase } from '@cogoport/utils';

import { getEventTitle } from '../../../../utils/getEventTitle';

import styles from './styles.module.css';

const USER_EVENT = [
	'System: Auth: Partner User Login Failed',
	'System: Auth: App User Login Failed',
	'System: Auth: Partner Lead User Login Failed',
	'System: Auth: App Lead User Login Failed',
	'System: Auth: Partner user logged in',
	'System: Auth: App user logged in',
];

const USER_EVENT_TITLE_MAPPING = {
	'System: Auth: Partner User Login Failed'      : 'Login Failed',
	'System: Auth: App User Login Failed'          : 'Login Failed',
	'System: Auth: Partner Lead User Login Failed' : 'Login Failed',
	'System: Auth: App Lead User Login Failed'     : 'Login Failed',
	'System: Auth: Partner user logged in'         : 'Logged In',
	'System: Auth: App user logged in'             : 'Logged In',
};

function LoginFailed({ name = '', data = {}, scope = '', eventName = '' }) {
	const eventTitle = getEventTitle({ name });

	return (
		<>
			<div className={styles.title}>
				{(USER_EVENT || []).includes(eventName) ? (
					<>
						{startCase(scope)}
						{' '}
						{USER_EVENT_TITLE_MAPPING[eventName]}
					</>

				) : eventTitle }
			</div>
			<div className={styles.message}>
				{startCase(data?.error)}
			</div>
		</>
	);
}

export default LoginFailed;
