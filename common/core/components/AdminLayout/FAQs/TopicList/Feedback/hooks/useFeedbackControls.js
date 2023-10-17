import {
	asyncTicketsCategory,
	asyncFieldsTicketTypes,
} from '@cogoport/forms';
import useGetAsyncTicketOptions from '@cogoport/forms/hooks/useGetAsyncTicketOptions';

const useFeedbackControls = ({ watchCategory }) => {
	const categoryOptions = useGetAsyncTicketOptions({
		...asyncTicketsCategory(),
	});

	const ticketTypeOptions = useGetAsyncTicketOptions({
		...asyncFieldsTicketTypes(),
		params: {
			Audience : 'cogoport_user',
			Category : watchCategory || undefined,
		},
	});

	return [
		{
			...(categoryOptions || {}),
			label          : 'Category',
			name           : 'category',
			controllerType : 'select',
			placeholder    : 'Select Type',
			isClearable    : true,
			defaultOptions : true,
			rules          : { required: true },
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
		},

		{
			label          : 'Describe Issue',
			name           : 'additional_information',
			controllerType : 'textarea',
			placeholder    : 'Enter Comments',
			rules          : { required: true },
			maxLength      : 350,
			rows           : 4,
		},
		{
			label          : 'Upload Supporting Document',
			name           : 'file_url',
			controllerType : 'uploader',
		},
	];
};

export default useFeedbackControls;
