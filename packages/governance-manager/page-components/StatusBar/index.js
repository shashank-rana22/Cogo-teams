import { Tabs, TabPanel } from '@cogoport/components';

import styles from './styles.module.css';

function StatusBar({ activeTab, setActiveTab }) {
	return (
		<div className={styles.parent}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
				fullWidth
			>
				<TabPanel name="need_analysis" title="Need Analysis" badge={31} />
				<TabPanel name="market_feedback" title="Market Feedback" badge={51} />
				<TabPanel name="supplier_evaluation" title="Supplier Evaluation" badge={51} />
				<TabPanel name="due_dilligance" title="Due Dilligance" badge={51} />
				<TabPanel name="supplier_approval" title="Supplier Approval" badge={51} />
				<TabPanel name="contract_sla" title="Contract & SLA" badge={51} />
			</Tabs>
		</div>
	);
}
export default StatusBar;
