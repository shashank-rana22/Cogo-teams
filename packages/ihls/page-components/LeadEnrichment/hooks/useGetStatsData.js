import { useRequest } from '@cogoport/request';

const TITLE_MAPPING = {
	source             : 'Source',
	segment            : 'Segment',
	company_type       : 'Company Type',
	lifecycle_stage    : 'Lifecycle Stage',
	shipment           : 'Trade',
	registration       : 'Registration',
	users              : 'User',
	organization_users : 'Organization Users',
	user_contacts      : 'User Enriched',
	enrichment_stats   : 'Enrichment Stats',
};

const MAPPING = {
	enterprise: {
		label : 'Enterprise',
		color : '#FFEA67',
	},
	mid_size: {
		label : 'Mid Size',
		color : '#ABCD62',
	},
	long_tail: {
		label : 'Long Tail',
		color : '#EE3425',
	},
	air: {
		label : 'AIR',
		color : '#69A5CD',
	},
	sea: {
		label : 'SEA',
		color : '#76CEC1',
	},
	present: {
		label : 'Present',
		color : '#69A5CD',
	},
	not_present: {
		label : 'Not Present',
		color : '#76CEC1',
	},
	company: {
		label : 'Company',
		color : '#69A5CD',
	},
	llp: {
		label : 'LLP',
		color : '#76CEC1',
	},
	proprietorship: {
		label : 'Proprietorship',
		color : '#B5AFD4',
	},
	enriched: {
		label : 'Enriched',
		color : '#69A5CD',
	},
	kyc_verified: {
		label : 'KYC Verified',
		color : '#B5AFD4',
	},
	sales_qualified: {
		label : 'Sales Qualified',
		color : '#76CEC1',
	},
	transacting: {
		label : 'Transacting',
		color : '#FFAD5B',
	},
	marketing_qualified: {
		label : 'Marketing Qualified',
		color : '#EE3425',
	},
	platform: {
		label : 'platform',
		color : '#76CEC1',
	},
	ihls: {
		label : 'ihls',
		color : '#FFAD5B',
	},
	email: {
		label : 'Email',
		color : '#76CEC1',
	},
	mobile: {
		label : 'Mobile',
		color : '#69A5CD',
	},
	lead_users: {
		label : 'Lead User',
		color : '#76CEC1',
	},
	users: {
		label : 'User',
		color : '#69A5CD',
	},
	both: {
		label : 'Both',
		color : '#B5AFD4',
	},
	others: {
		label : 'Others',
		color : '#FFAD5B',
	},
	none: {
		label : 'None',
		color : '#FFAD5B',
	},
	not_enriched: {
		label : 'Not Enriched',
		color : '#76CEC1',
	},
};

const PERCENTAGE = 100;
const UNITY = 1;

const useGetStatsData = ({ stats_type = null, params = {} }) => {
	const [{ data = {}, loading = false, error }] = useRequest({
		url    : '/lead_stats',
		method : 'get',
		params : {
			filters: {
				type : stats_type,
				q    : undefined,
				...params.filters,
			},
		},
	}, { manual: false });

	const modifiedData = (data?.data || [])?.map((item) => {
		const id = item.id ? item.id : 'none';
		return ({
			...item,
			id,
			label      : MAPPING[id]?.label || id,
			color      : MAPPING[id]?.color,
			percentage : Math.round((item.value * PERCENTAGE) / (data?.count || UNITY)),
		});
	});

	return {
		title : TITLE_MAPPING[stats_type] || stats_type,
		count : loading ? '---' : data?.count,
		data  : loading ? [] : modifiedData || [],
		loading,
		error,
	};
};

export default useGetStatsData;
