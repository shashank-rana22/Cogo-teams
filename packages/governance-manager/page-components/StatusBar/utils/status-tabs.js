export const statusTabs = ({ approvalStats }) => [{
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
