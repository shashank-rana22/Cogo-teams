import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function StatusBar() {
	const [activeTab, setActiveTab] = useState('local_rates');

	return (
		<div className={styles.parent}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
				fullWidth
			>
				<TabPanel name="need_anlaysis" title="Need Analysis" badge={31} />
				<TabPanel name="market_feedback" title="Market Feedback" badge={51} />
				<TabPanel name="supplier_evaluation" title="Supplier Evaluation" badge={51} />
				<TabPanel name="due_dilligance" title="Due Dilligance" badge={51} />
				<TabPanel name="supllier_approval" title="Supplier Approval" badge={51} />
				<TabPanel name="contract_sla" title="Contract & SLA" badge={51} />
			</Tabs>
		</div>
	);
}
export default StatusBar;
