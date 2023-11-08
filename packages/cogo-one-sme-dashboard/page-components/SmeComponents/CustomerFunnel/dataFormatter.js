import calcChange from '../../../helpers/calcChange';

function dataFormatter({
	currentData = {},
	previousData = {},
}) {
	return [
		{
			label    : 'Website Visitors',
			value    : currentData?.website_visitors_count || 0,
			valueKey : 'website_visitors_count',
			change   : calcChange({
				valueKey: 'website_visitors_count',
				currentData,
				previousData,
			}),
		},
		{
			label    : 'Awareness Stage',
			value    : currentData?.awareness_stage || 0,
			valueKey : 'awareness_stage',
			change   : calcChange({
				valueKey: 'awareness_stage',
				currentData,
				previousData,
			}),
		},
		{
			label    : 'AQL (enriched data)',
			value    : currentData?.aql || 0,
			valueKey : 'aql',
			change   : calcChange({
				valueKey: 'aql',
				currentData,
				previousData,
			}),
		},
		{
			label    : 'Interest Captured',
			value    : currentData?.interest_captured || 0,
			valueKey : 'interest_captured',
			change   : calcChange({
				valueKey: 'interest_captured',
				currentData,
				previousData,
			}),
		},
		{
			label    : 'MQL',
			value    : currentData?.mql || 0,
			valueKey : 'mql',
			change   : calcChange({
				valueKey: 'mql',
				currentData,
				previousData,
			}),
		},
		{
			label    : 'Account Created',
			value    : currentData?.created_accounts_count || 0,
			valueKey : 'created_accounts_count',
			change   : calcChange({
				valueKey: 'created_accounts_count',
				currentData,
				previousData,
			}),
		},
		{
			label    : 'Engagement Stage(Pre KYC)',
			value    : currentData?.pre_kyc_count || 0,
			valueKey : 'pre_kyc_count',
			change   : calcChange({
				valueKey: 'pre_kyc_count',
				currentData,
				previousData,
			}),
		},
		{
			label    : 'KYC Verified',
			value    : currentData?.verified_accounts_count || 0,
			valueKey : 'verified_accounts_count',
			change   : calcChange({
				valueKey: 'verified_accounts_count',
				currentData,
				previousData,
			}),
		},
		{
			label    : 'Engagement Stage(Post KYC)',
			value    : currentData?.post_kyc_count || 0,
			valueKey : 'post_kyc_count',
			change   : calcChange({
				valueKey: 'post_kyc_count',
				currentData,
				previousData,
			}),
		},
		{
			label    : 'Transaction Stage',
			value    : currentData?.transacting_count || 0,
			valueKey : 'transacting_count',
			change   : calcChange({
				valueKey: 'transacting_count',
				currentData,
				previousData,
			}),
		},
		{
			label    : 'Retained Customers',
			value    : currentData?.retained_count || 0,
			valueKey : 'retained_count',
			change   : calcChange({
				valueKey: 'retained_count',
				currentData,
				previousData,
			}),
		},
		{
			label    : 'Churned Stage',
			value    : currentData?.churned_count || 0,
			valueKey : 'churned_count',
			change   : calcChange({
				valueKey: 'churned_count',
				currentData,
				previousData,
			}),
		},
		{
			label    : 'Retired Stage',
			value    : currentData?.retired_stage || 0,
			valueKey : 'retired_stage',
			change   : calcChange({
				valueKey: 'retired_stage',
				currentData,
				previousData,
			}),
		},
	];
}

export default dataFormatter;
