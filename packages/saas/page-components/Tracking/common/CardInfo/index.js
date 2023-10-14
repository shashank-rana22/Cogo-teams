import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

import getMappingObject from '../../constant/card';

import styles from './styles.module.css';

function CardInfo({ activeTab = '', type = '', input = '', referenceNo = '', serialId = '' }) {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const getMapping = useMemo(() => getMappingObject({ t }), [t]);

	const { CARD_TITLE = '' } = getMapping?.[activeTab] || {};

	return (
		<div className={styles.container}>

			<div className={cl`${styles.tag} ${styles.header}`}>
				{activeTab === 'ocean' ? CARD_TITLE?.[type] : CARD_TITLE}
				{' '}
				:
				{' '}
				{input}
			</div>

			{referenceNo ? (
				<div className={cl`${styles.tag} ${styles.reference_no}`}>
					Ref No. :
					{' '}
					{referenceNo}
				</div>
			) : null}

			{serialId ?	(
				<div className={styles.book_cogo_tag}>
					<div className={cl`${styles.tag} ${styles.book_cogo}`}>
						{t('airOceanTracking:air_ocean_tracking_card_info_text_1')}
					</div>
					<div className={cl`${styles.tag} ${styles.book_cogo}`}>
						SID:
						{' '}
						{serialId}
					</div>
				</div>
			) : null}

		</div>

	);
}

export default CardInfo;
