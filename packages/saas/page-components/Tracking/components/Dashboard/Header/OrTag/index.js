import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function OrTag() {
	const { t } = useTranslation(['common', 'airOceanTracking']);
	return (
		<div className={styles.container}>
			<div className={styles.line} />
			<div className={styles.or_text}>{t('airOceanTracking:air_ocean_tracking_OR_tag_label')}</div>
			<div className={styles.line} />
		</div>
	);
}

export default OrTag;
