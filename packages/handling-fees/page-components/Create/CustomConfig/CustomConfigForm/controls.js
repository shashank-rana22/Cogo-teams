const FILTER_MAPPING = {
	importer_exporter: {
		account_type       : 'importer_exporter',
		is_channel_partner : false,
	},
	channel_partner: {
		is_channel_partner: true,
	},
};
const getOrganizationControl = ({ itemValue = {}, organizationDetails = {} }) => {
	const { organization_ids } = itemValue;
	return [
		{
			label          : 'Organization(s)',
			name           : 'organization_ids',
			type           : 'async_select',
			placeholder    : 'Select Organizations',
			asyncKey       : 'organizations',
			span           : 4,
			initialCall    : true,
			labelKey       : 'business_name',
			optionsListKey : 'organizations',
			renderLabel    : organizationDetails?.cogo_entity_id,
			params         : {
				page_limit : 100,
				filters    : {
					status     : 'active',
					partner_id : organizationDetails?.cogo_entity_id,
					...FILTER_MAPPING[organizationDetails?.organization_type],
				},
			},
			multiple : true,
			value    : organization_ids,
			rules    : {
				required: 'Organization details is Required.',
			},
		},
	];
};

export default getOrganizationControl;
