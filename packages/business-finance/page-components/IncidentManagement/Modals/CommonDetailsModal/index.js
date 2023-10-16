import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import AllStakeHolderTimeline from '../../AllStakeHolderTimeline';
import EmptyState from '../../common/EmptyStateCommon';
import ViewPdf from '../../common/ViewPdf';
import allStakeHolderTimeLineData from '../../utils/useFormatAllStakeHolderData';

import { DOCUMENT_MAPPING, HEADER_MAPPING, REQUEST_MAPPING, TYPE_COMPONENT_MAPPING } from './contants';
import styles from './styles.module.css';

const NO_PDF_VIEWS = ['ADVANCE_SECURITY_DEPOSIT', 'SAAS'];

function CommonPage({ row = {}, setDetailsModal = () => { }, refetch = () => { }, header = '' }) {
	const {
		level3 = {}, level2 = {}, level1 = {}, createdBy = {},
		remark = '', status = '', updatedBy = {}, financeRemark = '',
		type = '', data = {},
	} = row || {};
	const level0 = { ...createdBy, remark };
	const request = REQUEST_MAPPING[header];
	const document = DOCUMENT_MAPPING[header];

	const docUrl = row?.data?.[request]?.[document]?.[GLOBAL_CONSTANTS.zeroth_index] || '';

	const Component = TYPE_COMPONENT_MAPPING[header] || null;

	if (!Component) {
		return (
			<div className={styles.emptyContainer}>
				<div className={styles.noData}>

					No Data Available
				</div>

				<EmptyState />
			</div>
		);
	}

	return (
		<div>
			<div className={styles.heading}>
				{HEADER_MAPPING[header]}
			</div>
			<AllStakeHolderTimeline
				timeline={allStakeHolderTimeLineData(
					{
						level0, level1, level2, level3, status, updatedBy, financeRemark, type, data,
					},
				)}
			/>
			<div className={styles.request_heading}>

				<h3>Request Details</h3>
				<div className={styles.red_line} />

			</div>
			<div className={header === 'SAAS' ? styles.saas : styles.container_view}>
				{!NO_PDF_VIEWS.includes(header) && <ViewPdf docUrl={docUrl} />}
				<Component
					row={row}
					setDetailsModal={setDetailsModal}
					refetch={refetch}
				/>
			</div>

		</div>
	);
}
export default CommonPage;
