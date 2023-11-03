import { useRouter } from '@cogoport/next';
import React from 'react';

import useGetShipmentCostView from '../../../../hook/useGetShipmentCostView';

import CostSheetData from './CostSheetData';
import styles from './styles.module.css';

function CostSheetCard() {
	const { query: { job_id = '' } } = useRouter();
	const { costViewData = {}, costViewDataLoading = false } = useGetShipmentCostView({ jobId: job_id });

	return (
		<div className={styles.main_container}>
			<div style={{ marginBottom: '20px' }}>
				<div className={styles.headings}>
					Cost Sheet
					<div className={styles.line} />
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.hr} />
				<div className={styles.header_container}>
					<div className={styles.header_sub_container} />
					<div className={styles.header_sub_container}>Sell</div>
					<div className={styles.header_sub_container}>Buy</div>
				</div>
				<div className={styles.cost_sheet}>
					<CostSheetData costViewData={costViewData} costViewDataLoading={costViewDataLoading} />
				</div>
			</div>
		</div>
	);
}

export default CostSheetCard;
