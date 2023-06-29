import { asyncFieldsTicketTypes, asyncFieldsOrganizations, asyncFieldsOrganizationUser } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import useGetAsyncTicketOptions from '@cogoport/forms/hooks/useGetAsyncTicketOptions';

const useRaiseTicketcontrols = ({ watchOrgId, setAdditionalInfo }) => {
	const ticketTypeOptions = useGetAsyncTicketOptions({ ...asyncFieldsTicketTypes() });
	const organizationOptions = useGetAsyncOptions({ ...asyncFieldsOrganizations() });
	const organizationUserOptions = useGetAsyncOptions({
		...asyncFieldsOrganizationUser(),
		params: {
			filters: { organization_id: watchOrgId },
		},
		valueKey: 'user_id',
	});

	return [
		{
			...(ticketTypeOptions || {}),
			label          : 'Select issue type',
			name           : 'issue_type',
			controllerType : 'select',
			placeholder    : 'Select Type',
			isClearable    : true,
			rules          : { required: true },
			defaultOptions : true,
			showOptional   : false,
			onChange       : (_, val) => setAdditionalInfo(val?.AdditionalInfo),
		},
		{
			label          : 'Describe Issue',
			name           : 'additional_information',
			controllerType : 'textarea',
			placeholder    : 'Enter Comments',
		},
		{
			...(organizationOptions || {}),
			label          : 'On behalf of',
			name           : 'organization_id',
			controllerType : 'select',
			placeholder    : 'Select Organization',
			isClearable    : true,
			showOptional   : true,
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
			value          : 'medium',
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
			controllerType : 'uploader',
			showOptional   : false,
		},
		{
			label          : 'Notify customer',
			name           : 'notify_customer',
			controllerType : 'checkbox',
		},
	];
};

export default useRaiseTicketcontrols;
