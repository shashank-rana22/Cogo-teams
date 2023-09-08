const FILTER_MAPPING = {
	importer_exporter: {
		account_type       : 'importer_exporter',
		is_channel_partner : false,
	},
	channel_partner: {
		is_channel_partner: true,
	},
};
const getOrganizationControl = ({ itemValues = {}, organizationDetails }) => {
	const { organization_ids } = itemValues;

	return [
		{
			label          : 'Organization(s)',
			name           : 'organization_ids',
			type           : 'async_select',
			placeholder    : 'Select Organizations',
			asyncKey       : 'list_organizations',
			span           : 4,
			initialCall    : true,
			labelKey       : 'business_name',
			optionsListKey : 'organizations',
			renderLabel    : organizationDetails?.cogo_entity_id,
			params         : {
				filters: {
					status     : 'active',
					partner_id : organizationDetails?.cogo_entity_id,
					...FILTER_MAPPING[organizationDetails?.organization_type],
				},
			},
			multiple : true,
			value    : organization_ids,
			rules    : {
				required: true,
			},
		},
	];
};

export default getOrganizationControl;
