import { Tabs, TabPanel } from '@cogoport/components';

import styles from './styles.module.css';

function StatusBar({ activeTab, setActiveTab, approvalStats }) {
	console.log(approvalStats);
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
		name  : 'supplier_evaluation',
		title : 'Supplier Evaluation',
		badge : approvalStats?.total_supplier_evaluation,
	},
	{
		name  : 'due_dilligance',
		title : 'Due Dilligance',
		badge : approvalStats?.total_due_dilligance,
	},
	{
		name  : 'supplier_approval',
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
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={(e) => setActiveTab(e)}
				fullWidth
			>
				{
				status_objects.map((object, index) => (
					<TabPanel
						key={index}
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
