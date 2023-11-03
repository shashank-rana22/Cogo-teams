import currencyOptions from '@cogoport/forms/page-components/Business/PriceSelect/currencies';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { addDays } from '@cogoport/utils';

const ONE_DAY = 1;

const getRegistrationControls = ({ billingType = '' }) => ([
	{
		name        : 'pan_number',
		label       : 'Pan Number',
		placeholder : 'Enter Pan Number',
		size        : 'sm',
		type        : 'text',
		rules       : {
			required : true,
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.pan_number,
				message : 'PAN/Registration Number is invalid',
			},
		},
	},
	{
		name        : 'aadharNumber',
		label       : 'Aadhar Number',
		placeholder : 'Enter Aadhar Card Number',
		size        : 'sm',
		type        : 'number',
		showEle     : billingType === 'Individual',
		rules       : {
			required : true,
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.aadhar_number,
				message : 'Aadhar Card Number is invalid',
			},
		},
	},
]);

const getInsuranceControls = ({ incotermResponse = {} }) => {
	const { list = [], display = false } = incotermResponse || {};
	return ([
		{
			name        : 'currency',
			label       : 'Invoice Currency',
			placeholder : 'Select Invoice Currency',
			type        : 'select',
			size        : 'sm',
			options     : currencyOptions,
			rules       : { required: true },
		},
		{
			name        : 'cargoValue',
			label       : 'Invoice Value',
			placeholder : 'Select Invoice Value',
			size        : 'sm',
			type        : 'number',
			rules       : { required: true },
		},
		{
			name               : 'commodity',
			label              : 'Commoditiy',
			placeholder        : 'Select Commodity',
			type               : 'asyncSelect',
			size               : 'sm',
			asyncKey           : 'insurance_commodities',
			initialCall        : true,
			rules              : { required: true },
			labelKey           : 'display_name',
			getModifiedOptions : ({ options }) => options.map((opt) => ({
				...opt,
				display_name: (
					<div>
						{opt?.commodity}
						(
						{opt?.subCommodity}
						)

					</div>),
			})),
		},
		{
			name        : 'cargoDescription',
			label       : 'Cargo Description',
			placeholder : 'Enter Cargo Description',
			size        : 'sm',
			type        : 'text',
			rules       : {
				required: true,
			},
		},
		{
			name        : 'packageDescription',
			label       : 'Package Description',
			placeholder : 'Enter Package Description',
			size        : 'sm',
			type        : 'text',
			rules       : {
				required: true,
			},

		},
		{
			name                  : 'transitDate',
			label                 : 'Departure Date',
			placeholder           : 'Select Departure Date',
			size                  : 'sm',
			type                  : 'datepicker',
			minDate               : addDays(new Date(), ONE_DAY),
			isPreviousDaysAllowed : true,
			rules                 : {
				required: true,
			},
		},
		{
			name        : 'riskCoverage',
			label       : 'Coverage',
			placeholder : 'Select Coverage',
			size        : 'sm',
			type        : 'select',
			options     : [
				{ label: 'All Risk', value: 'ALL_RISK' },
				{ label: 'Basic Risk', value: 'BASIC_RISK' },
			],
			rules: {
				required: true,
			},
			disabled: true,

		},
		{
			name        : 'coverageFrom',
			label       : 'Coverage From',
			placeholder : 'Enter Coverage From',
			size        : 'sm',
			type        : 'text',
			rules       : {
				required: true,
			},

		},
		{
			name        : 'coverageTo',
			label       : 'Coverage To',
			placeholder : 'Enter Coverage To',
			size        : 'sm',
			type        : 'text',
			rules       : {
				required: true,
			},

		},
		{
			name        : 'invoiceNo',
			label       : 'Invoice No',
			placeholder : 'Enter Invoice No',
			size        : 'sm',
			type        : 'text',
			rules       : {
				required: true,
			},

		},
		{
			name                  : 'invoiceDate',
			label                 : 'Invoice Date',
			placeholder           : 'Enter Invoice Date',
			size                  : 'sm',
			type                  : 'datepicker',
			maxDate               : new Date(),
			isPreviousDaysAllowed : true,
			rules                 : {
				required: true,
			},

		},
		{
			name        : 'incoterm',
			label       : 'Incoterm',
			placeholder : 'Select Incoterm',
			size        : 'sm',
			type        : 'select',
			options     : (list || []).map((ele) => ({ label: ele, value: ele })),
			rules       : {
				required: true,
			},
			showEle: display,
		},
	]);
};

const getFileControls = ({ billingType = '', verificationDoc = {} }) => {
	const { aadharDoc = {}, invoiceDoc = {}, panDoc = {}, gstDoc = {} } = verificationDoc || {};

	return ([
		{
			name       : 'invoiceDoc',
			label      : 'Invoice Doc',
			type       : 'fileUpload',
			size       : 'sm',
			uploadDesc : 'Upload Invoice Doc',
			uploadIcon : (
				<Image
					src={GLOBAL_CONSTANTS.image_url.upload_icon}
					width={40}
					height={40}
					alt="upload"
				/>
			),
			defaultValues: invoiceDoc?.url,

			rules: {
				required: true,
			},
		},
		{
			name       : 'panDoc',
			label      : 'Pan Doc',
			type       : 'fileUpload',
			size       : 'sm',
			uploadDesc : 'Upload Pan Doc',
			uploadIcon : (
				<Image
					src={GLOBAL_CONSTANTS.image_url.upload_icon}
					width={40}
					height={40}
					alt="upload"
				/>
			),
			defaultValues: panDoc?.url,

			rules: {
				required: true,
			},

		},
		{
			name       : 'aadharDoc',
			label      : 'Aadhar Doc',
			type       : 'fileUpload',
			size       : 'sm',
			uploadDesc : 'Upload Aadhar Doc',
			uploadIcon : (
				<Image
					src={GLOBAL_CONSTANTS.image_url.upload_icon}
					width={40}
					height={40}
					alt="upload"
				/>
			),
			defaultValues : aadharDoc?.url,
			rules         : {
				required: true,
			},
			showEle: billingType === 'Individual',

		},
		{
			name       : 'gstDoc',
			label      : 'GST Doc',
			type       : 'fileUpload',
			size       : 'sm',
			uploadDesc : 'Upload GST Doc',
			uploadIcon : (
				<Image
					src={GLOBAL_CONSTANTS.image_url.upload_icon}
					width={40}
					height={40}
					alt="upload"
				/>
			),
			defaultValues: gstDoc?.url,

			rules: {
				required: true,
			},
			showEle: billingType === 'Corporate',
		},
	]);
};

export { getInsuranceControls, getRegistrationControls, getFileControls };
