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
				<CostSheetData costViewData={costViewData} costViewDataLoading={costViewDataLoading} />
			</div>
		</div>
	);
}

export default CostSheetCard;
