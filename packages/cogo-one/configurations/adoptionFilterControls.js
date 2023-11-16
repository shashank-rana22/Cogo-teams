import { startCase } from '@cogoport/utils';

import {
	ADOPTIOIN_ESCALATION_OPTIONS, ADOPTION_REQUEST_STATUS_OPTIONS,
	ADOPTION_REQUEST_TYPE_OPITIONS,
} from '../constants/platformAdoptionConstant';

const getAdoptionControls = ({ initialViewType = '', pageType = '' }) => {
	const controls = [
		{
			label          : 'Request Type',
			name           : 'request_type',
			controllerType : 'select',
			placeholder    : 'select request type',
			options        : ADOPTION_REQUEST_TYPE_OPITIONS,
			isClearable    : true,
			viewType       : ['cogoone_admin', 'support', 'support_supply'],
			pageType       : ['history', 'home'],
		},
		{
			label          : 'Requested Completed By',
			name           : 'requested_completed_by',
			placeholder    : 'select requested user',
			controllerType : 'asyncSelect',
			asyncKey       : 'list_chat_agents',
			isClearable    : true,
			initialCall    : true,
			viewType       : ['cogoone_admin'],
			pageType       : ['history'],
		},
		{
			label          : 'Assigned To',
			name           : 'assigned_to',
			placeholder    : 'select assigned user',
			controllerType : 'asyncSelect',
			asyncKey       : 'list_chat_agents',
			params         : {
				filters: {
					agent_type: ['support', 'support_supply'],
				},
				sort_by: 'agent_type',
			},
			initialCall : true,
			isClearable : true,
			viewType    : ['cogoone_admin'],
			pageType    : ['history', 'home'],
			renderLabel : (item) => (
				<div>
					<div style={{ fontWeight: '600', color: '#4f4f4f' }}>
						{startCase(item.name)}
					</div>
					<div style={{ fontSize: '12px', color: '#838080' }}>
						{startCase(item?.agent_type)}
					</div>
				</div>
			),
		},
		{
			label          : 'Escalation Cycle',
			name           : 'escalation_cycle',
			isClearable    : true,
			options        : ADOPTIOIN_ESCALATION_OPTIONS,
			controllerType : 'select',
			placeholder    : 'select escalation cycle',
			viewType       : ['cogoone_admin', 'support', 'support_supply'],
			pageType       : ['history', 'home'],
		},
		{
			label          : 'Request Status',
			name           : 'request_status',
			isClearable    : true,
			options        : ADOPTION_REQUEST_STATUS_OPTIONS,
			controllerType : 'select',
			placeholder    : 'select request status',
			viewType       : ['cogoone_admin', 'support', 'support_supply'],
			pageType       : ['history'],
		},
		{
			label                 : 'Date Range',
			name                  : 'dateRange',
			controllerType        : 'singleDateRange',
			size                  : 'sm',
			isPreviousDaysAllowed : true,
			maxDate               : new Date(),
			isClearable           : true,
			placeholder           : 'select date range',
			viewType              : ['cogoone_admin', 'support', 'support_supply'],
			pageType              : ['history', 'home'],
		},
	];

	return controls?.filter((control) => control?.viewType?.includes(initialViewType)
        && control?.pageType?.includes(pageType));
};

export default getAdoptionControls;
