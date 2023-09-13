export const statusTabs = ({ approvalStats, role, t }) => {
	if (role === 'governance_lead') {
		return 	[{
			name  : 'organization_approval',
			title : t('main_page_filter_tabs_organization_approval'),
			badge : approvalStats?.total_supplier_approval,
		},
		{
			name  : 'contract_and_sla_updation',
			title : t('main_page_filter_tabs_contract_and_sla'),
			badge : approvalStats?.total_contract_and_sla_approval,
		}];
	}
	return	[{
		name  : 'need_analysis',
		title : t('main_page_filter_tabs_need_analysis'),
		badge : approvalStats?.total_need_analysis,
	},
	{
		name  : 'market_feedback',
		title : t('main_page_filter_tabs_market_feedback'),
		badge : approvalStats?.total_market_feedback,
	},
	{
		name  : 'organization_evaluation',
		title : t('main_page_filter_tabs_organization_evaluation'),
		badge : approvalStats?.total_organization_evaluation,
	},
	{
		name  : 'organization_approval',
		title : t('main_page_filter_tabs_organization_approval'),
		badge : approvalStats?.total_supplier_approval,
	},
	{
		name  : 'contract_and_sla_updation',
		title : t('main_page_filter_tabs_contract_and_sla'),
		badge : approvalStats?.total_contract_and_sla_updation,
	}];
};
