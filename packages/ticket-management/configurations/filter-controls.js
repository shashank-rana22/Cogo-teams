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
			label          : 'Select Service',
			name           : 'service',
			controllerType : 'select',
			placeholder    : 'Select service',
			rules          : { required: true },
			options        : GLOBAL_CONSTANTS.shipment_types,
			isClearable    : true,
			onChange       : () => resetField('issue_type'),
		},
		{
			label          : 'Select Trade Type',
			name           : 'trade_type',
			controllerType : 'select',
			placeholder    : 'Select Trade Type',
			rules          : { required: true },
			options        : GLOBAL_CONSTANTS.trade_types,
			isClearable    : true,
			onChange       : () => resetField('issue_type'),
		},
		{
			...(categoryOptions || {}),
			label          : 'Select category',
			name           : 'category',
			controllerType : 'select',
			placeholder    : 'Select Type',
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
			label          : 'Select Sub-category',
			name           : 'sub_category',
			controllerType : 'select',
			placeholder    : 'Select sub category',
			rules          : { required: true },
			isClearable    : true,
			options        : formattedSubCategories,
			onChange       : () => resetField('issue_type'),
		},
		{
			...(ticketTypeOptions || {}),
			label          : 'Select issue type',
			name           : 'issue_type',
			controllerType : 'select',
			placeholder    : 'Select Type',
			isClearable    : true,
			rules          : { required: true },
			defaultOptions : true,
			onChange       : (_, val) => setAdditionalInfo(val?.AdditionalInfo),
		},
		{
			label          : 'Describe Issue',
			name           : 'additional_information',
			controllerType : 'textarea',
			placeholder    : 'Enter Comments',
			rules          : { required: true },
		},
		{
			...(organizationOptions || {}),
			label          : 'On behalf of',
			name           : 'organization_id',
			controllerType : 'select',
			placeholder    : 'Select Organization',
			isClearable    : true,
		},
		{
			...(organizationUserOptions || {}),
			label          : 'Select User',
			name           : 'user_id',
			controllerType : 'select',
			placeholder    : 'Select User',
			isClearable    : true,
			rules          : { required: true },

		},
		{
			label          : 'Priority',
			name           : 'priority',
			controllerType : 'select',
			value          : 'medium',
			placeholder    : 'Select Type',
			options        : [
				{
					label : 'Medium',
					value : 'medium',
				},
				{
					label : 'low',
					value : 'Low',
				},
				{
					label : 'High',
					value : 'high',
				},
			],
			theme     : 'admin',
			className : 'primary md',
		},
		{
			label          : 'Upload Supporting Document',
			name           : 'file_url',
			controllerType : 'uploader',
		},
		{
			label          : 'Notify customer',
			name           : 'notify_customer',
			controllerType : 'checkbox',
		},
	];
};

export default useRaiseTicketcontrols;
