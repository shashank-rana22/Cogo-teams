import {
	asyncFieldsTicketTypes, asyncFieldsOrganizations, asyncFieldsOrganizationUser,
	asyncTicketsCategory,
} from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import useGetAsyncTicketOptions from '@cogoport/forms/hooks/useGetAsyncTicketOptions';

const useRaiseTicketControls = ({
	watchOrgId, setSubCategories, setAdditionalInfo, formattedSubCategories, resetField,
	watchCategory, watchSubCategory, service, trade_type,
}) => {
	const ticketTypeOptions = useGetAsyncTicketOptions({
		...asyncFieldsTicketTypes(),
		params: {
			Service     : service || undefined,
			TradeType   : trade_type || undefined,
			Category    : watchCategory || undefined,
			Subcategory : watchSubCategory || undefined,
		},
	});
	const categoryOptions = useGetAsyncTicketOptions({ ...asyncTicketsCategory() });

	const organizationOptions = useGetAsyncOptions({
		...asyncFieldsOrganizations(),
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
			showOptional   : true,
			disabled       : true,
		},
		{
			...(organizationUserOptions || {}),
			label          : 'Select User',
			name           : 'user_id',
			controllerType : 'select',
			placeholder    : 'Select User',
			isClearable    : true,
			rules          : { required: true },
			showOptional   : true,
		},
		{
			label          : 'Priority',
			name           : 'priority',
			controllerType : 'select',
			placeholder    : 'Select Type',
			options        : [
				{
					label : 'Medium',
					value : 'medium',
				}, {
					label : 'low',
					value : 'Low',
				}, {
					label : 'High',
					value : 'high',
				},
			],
			theme        : 'admin',
			className    : 'primary md',
			showOptional : false,
		},
		{
			label          : 'Upload Supporting Document',
			name           : 'file_url',
			controllerType : 'fileUpload',
			showOptional   : false,
		},
		{
			label          : 'Notify customer',
			name           : 'notify_customer',
			controllerType : 'checkbox',
		},
	];
};

export default useRaiseTicketControls;
