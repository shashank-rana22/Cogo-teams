import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AllStakeHolderTimeline from '../../AllStakeHolderTimeline';
import ViewPdf from '../../common/ViewPdf';
import allStakeHolderTimeLineData from '../../utils/formatAllStakeHolderData';

import Details from './Details';
import styles from './styles.module.css';

function AdvanceSecurityDepositRefundDetails({ row = {}, setDetailsModal = () => {}, refetch = () => {} }) {
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
			<div className={styles.request_heading}>

				<h3>Request Details</h3>
				<div className={styles.red_line} />

			</div>
			<div className={styles.container_view}>
				<ViewPdf row={row} />
				<Details
					row={row}
					setDetailsModal={setDetailsModal}
					refetch={refetch}
				/>
			</div>

		</div>
	);
}
export default AdvanceSecurityDepositRefundDetails;
