import { Tabs, TabPanel, Select } from '@cogoport/components';

import styles from './styles.module.css';
import { serviceOptions } from './utils/service-options';

function StatusBar({ activeTab, setActiveTab, approvalStats, currentService, setCurrentService }) {
	const status_objects = [{
		name  : 'need_analysis',
		title : 'Need Analysis',
		badge : approvalStats?.total_need_analysis,
	},
	{
		name  : 'market_feedback',
		title : 'Market Feedback',
		badge : approvalStats?.total_market_feedback,
	},
	{
		name  : 'organization_evaluation',
		title : 'Supplier Evaluation',
		badge : approvalStats?.total_organization_evaluation,
	},
	{
		name  : 'organization_approval',
		title : 'Supplier Approval',
		badge : approvalStats?.total_supplier_approval,
	},
	{
		name  : 'contract_sla',
		title : 'Contract & SLA',
		badge : approvalStats?.total_contract_and_sla,
	}];

	return (
		<div className={styles.parent}>
			<div className={styles.select_service}>
				<Select
					value={currentService}
					onChange={setCurrentService}
					placeholder="Select Books"
					options={serviceOptions}
				/>
			</div>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={(e) => setActiveTab(e)}
				fullWidth
			>
				{
				status_objects.map((object) => (
					<TabPanel
						key={object?.name}
						name={object.name}
						title={object.title}
						badge={object.badge}
					/>
				))
                }
			</Tabs>
		</div>
	);
}
export default StatusBar;
