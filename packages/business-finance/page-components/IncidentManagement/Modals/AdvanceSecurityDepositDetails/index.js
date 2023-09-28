import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import AllStakeHolderTimeline from '../../AllStakeHolderTimeline';
import ViewPdf from '../../common/ViewPdf';
import allStakeHolderTimeLineData from '../../utils/formatAllStakeHolderData';

import Details from './Details';
import styles from './styles.module.css';

function AdvanceSecurityDepositDetails({ row = {}, setDetailsModal = () => {}, refetch = () => {} }) {
	const {
		level3 = {}, level2 = {}, level1 = {}, financeRemark = '',
		createdBy = {}, remark = '', data: { advanceSecurityDeposit = {} }, status = '', updatedBy = {},
	} = row || {};
	const docUrl = advanceSecurityDeposit?.documentUrls?.[GLOBAL_CONSTANTS.zeroth_index];

	const level0 = { ...createdBy, remark };
	return (
		<div>
			<div className={styles.heading}>
				Advance Container Security Deposit
			</div>
			<AllStakeHolderTimeline
				timeline={allStakeHolderTimeLineData(
					{ level0, level1, level2, level3, status, updatedBy, financeRemark },
				)}
			/>
			<div className={styles.request_heading}>

				<h3>Request Details</h3>
				<div className={styles.red_line} />

			</div>
			<div className={styles.container_view}>
				<ViewPdf docUrl={docUrl} />
				<Details
					row={row}
					setDetailsModal={setDetailsModal}
					refetch={refetch}
				/>
			</div>

		</div>
	);
}
export default AdvanceSecurityDepositDetails;
