export const items = ({ role, t }) => {
	if (role === 'governance_manager') {
		return [
			{ title: t('main_page_filter_tabs_need_analysis'), key: 'need_analysis' },
			{ title: t('main_page_filter_tabs_market_feedback'), key: 'market_feedback' },
			{ title: t('main_page_filter_tabs_organization_evaluation'), key: 'organization_evaluation' },
			{ title: t('main_page_filter_tabs_organization_approval'), key: 'organization_approval' },
			{ title: t('main_page_filter_tabs_contract_and_sla'), key: 'contract_and_sla_updation' },
		];
	}
	return [
		{ title: t('main_page_filter_tabs_organization_approval'), key: 'organization_approval' },
		{ title: t('main_page_filter_tabs_contract_and_sla'), key: 'contract_and_sla_updation' },
	];
};
