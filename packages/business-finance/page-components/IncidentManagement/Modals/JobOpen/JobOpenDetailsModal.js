import { useTranslation } from 'next-i18next';
import React from 'react';

import AllStakeHolderTimeline from '../../AllStakeHolderTimeline';
import useGetShipmentCostSheet from '../../hooks/useGetShipmentCostSheet';
import allStakeHolderTimeLineData from '../../utils/useFormatAllStakeHolderData';

import CostSheet from './components/CostSheet';
import Details from './components/Details';
import TimeLine from './components/TimeLine';
import ViewPdf from './components/ViewPdf';
import styles from './style.module.css';

const JOB_SOURCE = 'LOGISTICS';

function JobOpenDetailsModal({ row = {}, setDetailsModal = () => {}, refetch = () => {} }) {
	const shipmentId = row?.data?.jobOpenRequest?.id;
	const { jobNumber = '' } = row?.data?.jobOpenRequest || {};
	const JOB_TYPE = row?.source.toUpperCase();
	const {
		level3 = {}, level2 = {}, level1 = {}, createdBy = {}, remark : createdRemark = '',
		status = '', updatedBy = {}, financeRemark = '', data = {},
	} = row || {};

	const remark = data?.jobOpenRequest?.remark || createdRemark || '';

	const level0 = { ...createdBy, remark };
	const { t } = useTranslation(['incidentManagement']);
	const {
		preTaxData,
		postTaxData,
		preTaxLoading,
		postTaxLoading,
		selldata,
		buydata,
		apiloading,
		sellData,
		buyData,
		jobData,
		jobLoading,
	} = useGetShipmentCostSheet({ shipmentId, jobNumber, JOB_SOURCE, JOB_TYPE });

	return (
		<div className={styles.containerDisplay}>
			<div className={styles.job_number}>
				Job no. #
				{jobNumber}
			</div>

			<div className={styles.heading}>
				{t('incidentManagement:shipment_re_open_request')}
			</div>
			<AllStakeHolderTimeline
				timeline={allStakeHolderTimeLineData(
					{ level0, level1, level2, level3, status, updatedBy, financeRemark },
				)}
			/>
			<TimeLine row={row} />
			<CostSheet
				selldata={selldata}
				buydata={buydata}
				apiloading={apiloading}
				CostSheetsellData={sellData}
				CostSheetbuyData={buyData}
			/>
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
					preTaxData={preTaxData}
					postTaxData={postTaxData}
					preTaxLoading={preTaxLoading}
					postTaxLoading={postTaxLoading}
					jobData={jobData}
					jobLoading={jobLoading}
				/>
			</div>

		</div>
	);
}
export default JobOpenDetailsModal;
