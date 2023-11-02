import {
	asyncFieldsPartnerRoles,
	asyncFieldsPartnerUsers,
	useGetAsyncOptions,
	useGetAsyncOptionsMicroservice,
} from '@cogoport/forms';

import StakeholderCustomOption from '../common/ReassignTicket/StakeholderCustomOption';

const getShipmentTypeOption = ({ t = () => {}, requestType = '', idType = '' }) => {
	const options = [
		{ label: t('myTickets:role'), value: 'partner-roles' },
		{ label: t('myTickets:user'), value: 'partner-users' },
		{ label: t('myTickets:credit_controller'), value: 'credit_controller' },
		{ label: t('myTickets:sales_agent'), value: 'sales_agent' },
		{ label: t('myTickets:kam_owner'), value: 'kam_owner' },
		{ label: t('myTickets:stakeholders'), value: 'stakeholders' },
		{ label: t('myTickets:id_creator'), value: 'id_creator' },
	];

	if (requestType === 'shipment') {
		return options?.filter((option) => option?.value !== 'id_creator');
	}

	if (requestType === 'rate') {
		if (idType !== 'sid') {
			return options?.filter((option) => option?.value !== 'stakeholders');
		}
	}

	return options?.filter((option) => !['id_creator', 'stakeholders']?.includes(option?.value));
};

export const useReassignTicketsControls = ({
	t = () => {},
	watchType = '',
	setUserData = () => {},
	stakeHoldersData = [],
	requestType = '',
	idType = '',
}) => {
	const rolesOptions = useGetAsyncOptionsMicroservice({
		...{
			...asyncFieldsPartnerRoles(),
			params: {
				filters: {
					entity_types: ['cogoport'],
				},
			},
		},
	});

	const usersOptions = useGetAsyncOptions({ ...asyncFieldsPartnerUsers() });

	const stakeholdersOptions = (stakeHoldersData || []).map((itm) => ({
		label  : itm?.user?.name,
		value  : itm.user?.id,
		roleId : itm?.role_id,
		userId : itm.user?.id,
		data   : itm,
	}));

	const ASYNC_OPTION_MAPPING = {
		'partner-roles' : rolesOptions,
		'partner-users' : usersOptions,
		stakeholders    : stakeholdersOptions,
	};

	const assignToOptions = ASYNC_OPTION_MAPPING[watchType];

	return [
		{
			name           : 'type',
			label          : t('myTickets:type'),
			controllerType : 'select',
			value          : 'partner-roles',
			options        : getShipmentTypeOption({ t, requestType, idType }),
		},
		{
			...(assignToOptions || {}),
			name           : 'assign_to',
			label          : t('myTickets:assign_to'),
			controllerType : 'select',
			className      : 'primary md',
			placeholder    : t('myTickets:search_by_name'),
			onChange       : (_, obj) => setUserData(obj),
			rules          : { required: true },
		},
		{
			label          : t('myTickets:assign_to'),
			name           : 'stakeholder',
			controllerType : 'select',
			options        : stakeholdersOptions,
			placeholder    : t('myTickets:search_by_name'),
			onChange       : (_, obj) => setUserData(obj),
			rules          : { required: true },
			renderLabel    : (item) => <StakeholderCustomOption optionsLabel={item} />,
		},
		{
			name           : 'comment',
			controllerType : 'textarea',
			label          : t('myTickets:comments'),
			placeholder    : t('myTickets:enter_comments'),
		},
	];
};
