function dataFormatter({
	currentData = {},
}) {
	return [
		{
			label    : 'Website Visitors',
			value    : currentData?.website_visitors_count || 0,
			valueKey : 'website_visitors_count',
		},
		{
			label    : 'Awareness Stage',
			value    : currentData?.awareness_stage || 0,
			valueKey : 'awareness_stage',
		},
		{
			label    : 'AQL (enriched data)',
			value    : currentData?.aql || 0,
			valueKey : 'aql',
		},
		{
			label    : 'Interest Captured',
			value    : currentData?.interest_captured || 0,
			valueKey : 'interest_captured',
		},
		{
			label    : 'MQL',
			value    : currentData?.mql || 0,
			valueKey : 'mql',
		},
		{
			label    : 'Account Created',
			value    : currentData?.created_accounts_count || 0,
			valueKey : 'created_accounts_count',
		},
		{
			label    : 'KYC Verified',
			value    : currentData?.verified_accounts_count || 0,
			valueKey : 'verified_accounts_count',
		},
		{
			label    : 'Transaction Stage',
			value    : currentData?.transacting_count || 0,
			valueKey : 'transacting_count',
		},
		{
			label    : 'Retained Customers',
			value    : currentData?.retained_count || 0,
			valueKey : 'retained_count',
		},
		{
			label    : 'Churned Stage',
			value    : currentData?.churned_count || 0,
			valueKey : 'churned_count',
		},
	];
}

export default dataFormatter;
