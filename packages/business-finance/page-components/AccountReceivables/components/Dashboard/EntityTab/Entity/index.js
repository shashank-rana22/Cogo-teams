import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function Entity({ entityCode }) {
	const { t = () => '' } = useTranslation(['accountRecievables']);

	const { icon : Icon } = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode] || {};

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				{entityCode === 'all' ? 'ALL'
					: (
						<>
							{t('entity')}
							{entityCode}
						</>
					)}
			</div>
			<Icon height={20} width={20} />
		</div>
	);
}

export default Entity;
