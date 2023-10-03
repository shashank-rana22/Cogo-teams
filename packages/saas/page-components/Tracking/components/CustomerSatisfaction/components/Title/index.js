import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

import { getServiceNameTitleMapping } from '../../constants/service-name-title-mapping';

import styles from './styles.module.css';

function Title({ serviceName = '' }) {
	const { t } = useTranslation(['common']);

	const serviceNameTitleMapping = useMemo(() => getServiceNameTitleMapping({ t }), [t]);

	return (
		<div>
			<div className={styles.title_1}>
				{t('common:csat_title')}
			</div>
			<div className={styles.title_2}>
				{serviceNameTitleMapping[serviceName]}
			</div>
		</div>
	);
}

export default Title;
