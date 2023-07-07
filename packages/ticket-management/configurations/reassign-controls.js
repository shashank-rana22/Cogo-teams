import { asyncFieldsPartnerRoles, asyncFieldsPartnerUsers, useGetAsyncOptions } from '@cogoport/forms';

const ASYNC_OPTION_MAPPING = {
	'partner-roles' : asyncFieldsPartnerRoles(),
	'partner-users' : asyncFieldsPartnerUsers(),
};

export const useReassignTicketsControls = ({ watchType, setUserData }) => {
	const assignToOptions = useGetAsyncOptions({ ...ASYNC_OPTION_MAPPING[watchType] });

	return [
		{
			name           : 'type',
			label          : 'Type',
			controllerType : 'select',
			value          : 'partner-roles',
			options        : [
				{ label: 'Role', value: 'partner-roles' },
				{ label: 'User', value: 'partner-users' },
				{ label: 'Credit Controller', value: 'credit_controller' },
				{ label: 'Sales Agent', value: 'sales_agent' },
				{ label: 'Kam Owner', value: 'kam_owner' },
			],
		},
		{
			...(assignToOptions || {}),
			name           : 'assign_to',
			label          : 'Assign To',
			controllerType : 'select',
			className      : 'primary md',
			placeholder    : 'Search by Name',
			onChange       : (_, obj) => setUserData(obj),
		},
		{
			name           : 'comment',
			controllerType : 'textarea',
			label          : 'Comments',
			placeholder    : 'Enter Comments',
			rules          : { required: true },
		},
	];
};
