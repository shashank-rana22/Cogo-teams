import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function LoginComponent({ login }) {
	const { last_email_token_sent_at } = login || {};
	return (
		<>
			<div className={styles.activity_date}>
				<div className={styles.dot} />
				<div className={styles.durations}>
					{format(last_email_token_sent_at, 'HH:mm a dd MMM')}
				</div>
			</div>
			<div className={styles.main_card}>
				<div className={styles.card}>
					<div className={styles.title}>Secured Log in</div>
					<div className={styles.description}>
						On
						<span>
							{format(last_email_token_sent_at, 'dd MMM yyyy')}
						</span>
						at
						<span>
							{format(last_email_token_sent_at, 'HH:mm a')}
						</span>
						you securely logged in on the platform
					</div>
				</div>

			</div>
		</>
	);
}
export default LoginComponent;
