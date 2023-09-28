import {
	asyncTicketsCategory,
	asyncFieldsTicketTypes,
} from '@cogoport/forms';
import useGetAsyncTicketOptions from '@cogoport/forms/hooks/useGetAsyncTicketOptions';

function RenderLabel({ label = '' }) {
	return (
		<div>
			{label}
			<span style={{ color: '#ee3425', marginLeft: '2px' }}>*</span>
		</div>
	);
}
const useFeedbackControls = ({
	watchCategory = '',
	setAdditionalInfo = () => {},
}) => {
	const categoryOptions = useGetAsyncTicketOptions({
		...asyncTicketsCategory(),
		params: {
			Audience    : 'cogoport_user',
			RequestType : 'feedback',
		},
	});

	const ticketTypeOptions = useGetAsyncTicketOptions({
		...asyncFieldsTicketTypes(),
		params: {
			RequestType : 'feedback',
			Audience    : 'cogoport_user',
			Category    : watchCategory || undefined,
		},
	});

	return [
		{
			...(categoryOptions || {}),
			label          : <RenderLabel label="Category" />,
			name           : 'category',
			controllerType : 'select',
			placeholder    : 'Select Type',
			isClearable    : true,
			defaultOptions : true,
			rules          : { required: true },
		},
		{
			...(ticketTypeOptions || {}),
			label          : <RenderLabel label="Select Issue Type" />,
			name           : 'issue_type',
			controllerType : 'select',
			placeholder    : 'Select Type',
			isClearable    : true,
			defaultOptions : true,
			onChange       : (_, val) => setAdditionalInfo(val?.AdditionalInfo),
			rules          : { required: true },
		},

		{
			label          : <RenderLabel label="Describe Issue" />,
			name           : 'additional_information',
			controllerType : 'textarea',
			placeholder    : 'Enter Comments',
			rules          : { required: true },
		},
		{
			label          : 'Upload Supporting Document',
			name           : 'file_url',
			controllerType : 'uploader',
		},
	];
};

export default useFeedbackControls;
