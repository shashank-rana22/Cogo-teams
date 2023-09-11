import { isEmpty } from '@cogoport/utils';

const controls = [
	{
		name        : 'serial_id',
		type        : 'select',
		asyncKey    : 'list_user_shipments',
		placeholder : 'Select SID',
		isClearable : true,
		renderLabel : (item) => `${item?.serial_id} 
		 ${!isEmpty(item?.booking_agent) ? `- ${item?.booking_agent.name}` : ''}`,
		params: {
			user_shipments_required: false,
		},
	},
	{
		name        : 'organization_id',
		type        : 'select',
		asyncKey    : 'list_organizations_on_call',
		renderLabel : (item) => `${item.business_name} - (${item.serial_id})`,
		placeholder : 'Select Importer Exporter',
		isClearable : true,
		params      : {
			filters: {
				status       : 'active',
				account_type : 'importer_exporter',
			},
		},
	},
];

export default controls;
