import {
	asyncTicketsCategory,
	asyncFieldsTicketTypes,
} from '@cogoport/forms';
import useGetAsyncTicketOptions from '@cogoport/forms/hooks/useGetAsyncTicketOptions';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

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
	setValue = () => {},
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
				resetField('serial_id');
			},
		},
		{
			label          : <RenderLabel label="Select Sub Category" />,
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
			label          : <RenderLabel label="Select SID" />,
			name           : 'serial_id',
			asyncKey       : 'list_shipments',
			valueKey       : 'serial_id',
			controllerType : 'asyncSelect',
			placeholder    : 'select sid',
			rules          : { required: true },
			initialCall    : true,
			isClearable    : true,
			onChange       : (_, obj) => {
				resetField('service');
				resetField('trade_type');
				setValue('service', obj?.shipment_type);
				if (!obj?.trade_type) {
					setValue('trade_type', GLOBAL_CONSTANTS.options.inco_term?.[obj?.inco_term]?.trade_type);
				} else {
					setValue('trade_type', obj?.trade_type);
				}
			},
		},
		{
			label          : <RenderLabel label="Select Service" />,
			name           : 'service',
			controllerType : 'select',
			placeholder    : 'select service',
			options        : GLOBAL_CONSTANTS.shipment_types,
			isClearable    : true,
			disabled       : true,
			rules          : { required: true },
		},
		{
			label          : <RenderLabel label="Select Trade Type" />,
			name           : 'trade_type',
			controllerType : 'select',
			placeholder    : 'select trade type',
			rules          : { required: true },
			disabled       : true,
			options        : GLOBAL_CONSTANTS.trade_types,
			isClearable    : true,
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
