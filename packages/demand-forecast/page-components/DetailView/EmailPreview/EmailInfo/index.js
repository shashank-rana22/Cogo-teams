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
			<div>
				{t('demandForecast:email_message_link_comment')}
			</div>
			<div className={styles.body}>
				<a href={t('demandForecast:email_message_link_url')} className={styles.bodyUrl}>
					{t('demandForecast:email_message_link_url')}
				</a>
			</div>
			<div className={styles.footer}>
				{t('demandForecast:email_message_footer')}
			</div>
		</div>
	);
}

export default EmailInfo;
