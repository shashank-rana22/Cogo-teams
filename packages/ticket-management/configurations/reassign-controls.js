import { asyncFieldsPartnerRoles, asyncFieldsPartnerUsers, useGetAsyncOptions } from '@cogoport/forms';

const ASYNC_OPTION_MAPPING = {
	'partner-roles' : asyncFieldsPartnerRoles(),
	'partner-users' : asyncFieldsPartnerUsers(),
};

export const useReassignTicketsControls = ({ t, watchType, setUserData }) => {
	const assignToOptions = useGetAsyncOptions({ ...ASYNC_OPTION_MAPPING[watchType] });

	return [
		{
			name           : 'type',
			label          : t('myTickets:type'),
			controllerType : 'select',
			value          : 'partner-roles',
			options        : [
				{ label: t('myTickets:role'), value: 'partner-roles' },
				{ label: t('myTickets:user'), value: 'partner-users' },
				{ label: t('myTickets:credit_controller'), value: 'credit_controller' },
				{ label: t('myTickets:sales_agent'), value: 'sales_agent' },
				{ label: t('myTickets:kam_owner'), value: 'kam_owner' },
			],
		},
		{
			...(assignToOptions || {}),
			name           : 'assign_to',
			label          : t('myTickets:assign_to'),
			controllerType : 'select',
			className      : 'primary md',
			placeholder    : t('myTickets:search_by_name'),
			onChange       : (_, obj) => setUserData(obj),
		},
		{
			name           : 'comment',
			controllerType : 'textarea',
			label          : t('myTickets:comments'),
			placeholder    : t('myTickets:enter_comments'),
			rules          : { required: true },
		},
	];
};
