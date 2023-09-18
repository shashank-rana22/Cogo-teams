import { useTranslation } from 'next-i18next';

import { getServiceNameTitleMapping } from '../../constants/service-name-title-mapping';

import styles from './styles.module.css';

function Title({ serviceName = '' }) {
	const { t } = useTranslation(['common']);

	const SERVICE_NAME_TITLE_MAPPING = getServiceNameTitleMapping({ t });

	return (
		<div>
			<div className={styles.title_1}>
				{t('common:csat_title')}
			</div>
			<div className={styles.title_2}>
				{SERVICE_NAME_TITLE_MAPPING[serviceName]}
			</div>
		</div>
	);
}

export default Title;
