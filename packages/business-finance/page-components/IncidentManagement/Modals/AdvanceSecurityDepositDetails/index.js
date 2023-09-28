import React from 'react';

import AllStakeHolderTimeline from '../../AllStakeHolderTimeline';
import allStakeHolderTimeLineData from '../../utils/formatAllStakeHolderData';

import Details from './Details';
import styles from './styles.module.css';

function AdvanceSecurityDepositDetails({ row = {}, setDetailsModal = () => {}, refetch = () => {} }) {
	const {
		level3 = {}, level2 = {}, level1 = {},
		createdBy = {}, remark = '', status = '', updatedBy = {},
	} = row || {};
	const level0 = { ...createdBy, remark };
	return (
		<div className={styles.containerDisplay}>
			<div className={styles.heading}>
				Advance Container Security Deposit
			</div>
			<AllStakeHolderTimeline
				timeline={allStakeHolderTimeLineData({ level0, level1, level2, level3, status, updatedBy })}
			/>
			<div className={styles.request_heading}>

				<h3>Request Details</h3>
				<div className={styles.red_line} />

			</div>
			<div className={styles.container_view}>
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
