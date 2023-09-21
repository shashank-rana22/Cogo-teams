import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AllStakeHolderTimeline from '../../AllStakeHolderTimeline';
import allStakeHolderTimeLineData from '../../utils/formatAllStakeHolderData';

import styles from './style.module.css';

function JobOpenDetailsModal({ row = {} }) {
	const { level3 = {}, level2 = {}, level1 = {}, createdBy = {}, remark = '' } = row || {};
	const level0 = { ...createdBy, remark };
	const { t } = useTranslation(['incidentManagement']);

	return (
		<div className={styles.containerDisplay}>
			<div className={styles.heading}>
				{t('incidentManagement:shipment_re_open_request')}
			</div>
			{
			(!isEmpty(level1) || !isEmpty(level2) || !isEmpty(level3)) && (
				<AllStakeHolderTimeline
					timeline={allStakeHolderTimeLineData({ level0, level1, level2, level3 })}
				/>
			)
						}

		</div>
	);
}
export default JobOpenDetailsModal;
