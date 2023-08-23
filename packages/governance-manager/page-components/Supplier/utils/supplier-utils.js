export const items = ({ role }) => {
	if (role === 'governance_manager') {
		return [
			{ title: 'Need analysis', key: 'need_analysis' },
			{ title: 'Market Feedback', key: 'market_feedback' },
			{ title: 'Supplier Evaluation', key: 'organization_evaluation' },
			{ title: 'Supplier Approval', key: 'organization_approval' },
			{ title: 'Contract and SLA', key: 'contract_and_sla_updation' },
		];
	}
	return [
		{ title: 'Supplier Approval', key: 'organization_approval' },
		{ title: 'Contract and SLA', key: 'contract_and_sla_updation' },
	];
};
