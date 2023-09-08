import {
	asyncFieldsTicketTypes, asyncFieldsOrganizations, asyncFieldsOrganizationUser,
	asyncTicketsCategory,
} from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import useGetAsyncTicketOptions from '@cogoport/forms/hooks/useGetAsyncTicketOptions';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const useRaiseTicketcontrols = ({
	watchOrgId = '', setAdditionalInfo = () => {}, formattedSubCategories = [], setSubCategories = () => {},
	watchCategory = '', watchSubCategory = '', watchService = '', watchTradeType = '', resetField = () => {},
	t = () => {},
}) => {
	const organizationOptions = useGetAsyncOptions({ ...asyncFieldsOrganizations() });
	const categoryOptions = useGetAsyncTicketOptions({ ...asyncTicketsCategory() });
	const ticketTypeOptions = useGetAsyncTicketOptions({
		...asyncFieldsTicketTypes(),
		params: {
			Audience    : 'cogoport_user',
			Service     : watchService || undefined,
			Category    : watchCategory || undefined,
			TradeType   : watchTradeType || undefined,
			Subcategory : watchSubCategory || undefined,
		},
	});
	const organizationUserOptions = useGetAsyncOptions({
		...asyncFieldsOrganizationUser(),
		params: {
			filters: { organization_id: watchOrgId },
		},
		valueKey: 'user_id',
	});

	return [
		{
			label          : t('myTickets:select_service'),
			name           : 'service',
			controllerType : 'select',
			placeholder    : t('myTickets:select_service'),
			rules          : { required: true },
			options        : GLOBAL_CONSTANTS.shipment_types,
			isClearable    : true,
			onChange       : () => resetField('issue_type'),
		},
		{
			label          : t('myTickets:select_trade_type'),
			name           : 'trade_type',
			controllerType : 'select',
			placeholder    : t('myTickets:select_trade_type'),
			rules          : { required: true },
			options        : GLOBAL_CONSTANTS.trade_types,
			isClearable    : true,
			onChange       : () => resetField('issue_type'),
		},
		{
			...(categoryOptions || {}),
			label          : t('myTickets:select_category'),
			name           : 'category',
			controllerType : 'select',
			placeholder    : t('myTickets:select_category'),
			isClearable    : true,
			rules          : { required: true },
			defaultOptions : true,
			onChange       : (_, val) => {
				setSubCategories(val?.subcategories);
				resetField('sub_category');
				resetField('issue_type');
			},
		},
		{
			label          : t('myTickets:select_sub_category'),
			name           : 'sub_category',
			controllerType : 'select',
			placeholder    : t('myTickets:select_sub_category'),
			rules          : { required: true },
			isClearable    : true,
			options        : formattedSubCategories,
			onChange       : () => resetField('issue_type'),
		},
		{
			...(ticketTypeOptions || {}),
			label          : t('myTickets:select_issue_type'),
			name           : 'issue_type',
			controllerType : 'select',
			placeholder    : t('myTickets:select_issue_type'),
			isClearable    : true,
			rules          : { required: true },
			defaultOptions : true,
			onChange       : (_, val) => setAdditionalInfo(val?.AdditionalInfo),
		},
		{
			label          : t('myTickets:describe_issue'),
			name           : 'additional_information',
			controllerType : 'textarea',
			placeholder    : t('myTickets:enter_comments'),
			rules          : { required: true },
		},
		{
			...(organizationOptions || {}),
			label          : t('myTickets:on_behalf_of'),
			name           : 'organization_id',
			controllerType : 'select',
			placeholder    : t('myTickets:select_organization'),
			isClearable    : true,
		},
		{
			...(organizationUserOptions || {}),
			label          : t('myTickets:select_user'),
			name           : 'user_id',
			controllerType : 'select',
			placeholder    : t('myTickets:select_user'),
			isClearable    : true,
			rules          : { required: true },

		},
		{
			label          : t('myTickets:priority_label'),
			name           : 'priority',
			controllerType : 'select',
			value          : 'medium',
			placeholder    : t('myTickets:select_type'),
			options        : [
				{
					label : t('myTickets:medium'),
					value : 'medium',
				},
				{
					label : t('myTickets:low'),
					value : 'low',
				},
				{
					label : t('myTickets:high'),
					value : 'high',
				},
			],
			theme     : 'admin',
			className : 'primary md',
		},
		{
			label          : t('myTickets:upload_supporting_document'),
			name           : 'file_url',
			controllerType : 'uploader',
		},
		{
			label          : t('myTickets:notify_customer'),
			name           : 'notify_customer',
			controllerType : 'checkbox',
		},
	];
};

export default useRaiseTicketcontrols;
