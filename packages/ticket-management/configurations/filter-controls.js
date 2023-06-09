import { asyncFieldsTicketTypes, asyncFieldsOrganizations, asyncFieldsOrganizationUser } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import useGetAsyncTicketOptions from '@cogoport/forms/hooks/useGetAsyncTicketOptions';

const useRaiseTicketcontrols = ({ watchOrgId }) => {
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
			type           : 'select',
			placeholder    : 'Select Type',
			isClearable    : true,
			rules          : { required: true },
			defaultOptions : true,
			showOptional   : false,
		},
		{
			label       : 'Describe Issue',
			name        : 'additional_information',
			type        : 'textarea',
			placeholder : 'Enter Comments',
			theme       : 'admin',
			className   : 'primary md',
		},
		{
			...(organizationOptions || {}),
			label          : 'On behalf of',
			name           : 'organization_id',
			type           : 'select',
			placeholder    : 'Select Organization',
			isClearable    : true,
			theme          : 'admin',
			className      : 'primary md',
			rules          : { required: true },
			defaultOptions : true,
			showOptional   : true,
		},
		{
			...(organizationUserOptions || {}),
			label        : 'Select User',
			name         : 'user_id',
			type         : 'select',
			placeholder  : 'Select User',
			isClearable  : true,
			rules        : { required: true },
			theme        : 'admin',
			className    : 'primary md',
			showOptional : true,

		},
		{
			label       : 'Priority',
			name        : 'priority',
			type        : 'select',
			value       : 'medium',
			placeholder : 'Select Type',
			options     : [
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
			label        : 'Upload Supporting Documents',
			name         : 'file_url',
			type         : 'uploader',
			multiple     : true,
			theme        : 'admin',
			className    : 'primary md',
			showOptional : false,
		},
	];
};

export default useRaiseTicketcontrols;
