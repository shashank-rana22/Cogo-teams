import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function EmailInfo() {
	const { t } = useTranslation(['demandForecast']);
	return (
		<div>
			<div className={styles.title}>
				{t('demandForecast:email_message_head')}
			</div>

			<div className={styles.body}>
				{t('demandForecast:email_message_body')}
			</div>
			<div className={styles.footer}>
				{t('demandForecast:email_message_footer')}
			</div>
		</div>
	);
}

export default EmailInfo;
