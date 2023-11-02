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
	setDefaultTypeId = () => {},
	resetField = () => {},
	formattedSubCategories = [],
	setSubCategories = () => {},
	watchSubCategory = '',
}) => {
	const categoryOptions = useGetAsyncTicketOptions({
		...asyncTicketsCategory(),
		params: {
			Audience    : 'cogoone_demand',
			RequestType : 'feedback',
		},
	});

	const ticketTypeOptions = useGetAsyncTicketOptions({
		...asyncFieldsTicketTypes(),
		params: {
			RequestType : 'feedback',
			Audience    : 'cogoone_demand',
			Category    : watchCategory || undefined,
			size        : 100,
			SubCategory : watchSubCategory || undefined,
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
			onChange       : (_, val) => {
				setSubCategories((p) => ({ ...p, options: val?.subcategories }));
				resetField('sub_category');
				resetField('issue_type');
			},
		},
		{
			label          : 'Select Sub Category',
			name           : 'sub_category',
			controllerType : 'select',
			placeholder    : 'Select sub category',
			rules          : { required: true },
			isClearable    : true,
			options        : formattedSubCategories,
			onChange       : (_, val) => {
				setSubCategories((p) => ({ ...p, subCatId: val?.subId }));
				resetField('issue_type');
			},
		},
		{
			...(ticketTypeOptions || {}),
			label          : <RenderLabel label="Select Issue Type" />,
			name           : 'issue_type',
			controllerType : 'select',
			placeholder    : 'Select Type',
			isClearable    : true,
			defaultOptions : true,
			onChange       : (_, val) => {
				setAdditionalInfo(val?.AdditionalInfo);
				setDefaultTypeId(val?.ID);
			},
			rules: { required: true },
		},
		{
			label          : <RenderLabel label="Describe Issue" />,
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
		{
			label          : 'Is Critical',
			name           : 'is_critical',
			controllerType : 'checkbox',
		},
	];
};

export default useFeedbackControls;
