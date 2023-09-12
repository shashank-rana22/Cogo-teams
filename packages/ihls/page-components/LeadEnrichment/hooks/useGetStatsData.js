import { useRequest } from '@cogoport/request';

const COLOR_MAPPINGS = {
	source: {
		title  : 'Source',
		colors : ['#69A5CD', '#76CEC1', '#B5AFD4', '#FFAD5B'],
	},
	segment: {
		title : 'Segment',
		color : ['#FFEA67', '#ABCD62', '#EE3425', '#B5AFD4'],
	},
	company_type: {
		title : 'Company Type',
		color : ['#ABCD62', '#EE3425', '#FFEA67', '#69A5CD'],
	},
	lifecycle_stage: {
		title  : 'Lifecycle Stage',
		colors : ['#69A5CD', '#76CEC1', '#B5AFD4', '#FFAD5B'],
	},
	shipment: {
		title  : 'Trade',
		colors : ['#69A5CD', '#76CEC1', '#B5AFD4', '#FFAD5B'],
	},
	registration: {
		title  : 'Registration',
		colors : ['#69A5CD', '#76CEC1'],
	},
};
// 'lifecycle_stage', 'source'
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
	in_house: {
		label : 'In House',
		color : '#69A5CD',
	},
	manual: {
		label : 'Manual',
		color : '#B5AFD4',
	},
	cogoport_saas_signup: {
		label : 'cogoport_saas_signup',
		color : '#76CEC1',
	},
	ingestion: {
		label : 'Ingestion',
		color : '#FFAD5B',
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

	const modifiedData = (data?.data || [])?.map((item) => ({
		...item,
		id         : item.id ? item.id : 'none',
		label      : MAPPING[item.id]?.label,
		color      : MAPPING[item.id]?.color,
		percentage : Math.round((item.value * PERCENTAGE) / (data?.count || UNITY)),
	}));

	return {
		title               : COLOR_MAPPINGS[stats_type]?.title || '__',
		count               : loading ? '---' : data?.count,
		sample_contact_data : loading ? [] : modifiedData || [],
		loading,
		error,
	};
};

export default useGetStatsData;
