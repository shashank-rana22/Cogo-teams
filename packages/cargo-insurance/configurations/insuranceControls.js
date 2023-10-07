import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

const getRegistrationControls = ({ billingType }) => ([
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
		name        : 'aadharCard',
		label       : 'Aadhar Card',
		placeholder : 'Aadhar Card Number',
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

const getInsuranceControls = () => ([
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
		name        : 'transit-date',
		label       : 'Transit Start Date',
		placeholder : 'Select Transit Start Date',
		size        : 'sm',
		type        : 'datepicker',
		rules       : {
			required: true,
		},
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
		name        : 'coverage',
		label       : 'Coverage',
		placeholder : 'Enter Coverage',
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
		name        : 'invoiceDate',
		label       : 'Invoice Date',
		placeholder : 'Select Invoice Date',
		size        : 'sm',
		type        : 'datepicker',
		rules       : {
			required: true,
		},

	},
	{
		name        : 'incoterm',
		label       : 'Incoterm',
		placeholder : 'Select Incoterm',
		size        : 'sm',
		type        : 'select',
		rules       : {
			required: true,
		},
	},
]);

const getFileControls = () => ([
	{
		name       : 'invoiceDoc',
		label      : 'invoice Doc',
		type       : 'fileUpload',
		size       : 'sm',
		uploadIcon : (
			<Image
				src={GLOBAL_CONSTANTS.image_url.upload_icon}
				width={40}
				height={40}
				alt="upload"
			/>
		),
		rules: {
			required: true,
		},
	},
	{
		name       : 'aadharDoc',
		label      : 'Aadhar Doc',
		type       : 'fileUpload',
		size       : 'sm',
		uploadIcon : (
			<Image
				src={GLOBAL_CONSTANTS.image_url.upload_icon}
				width={40}
				height={40}
				alt="upload"
			/>
		),
		rules: {
			required: true,
		},

	},
	{
		name       : 'gstDoc',
		label      : 'GST Doc',
		type       : 'fileUpload',
		size       : 'sm',
		uploadIcon : (
			<Image
				src={GLOBAL_CONSTANTS.image_url.upload_icon}
				width={40}
				height={40}
				alt="upload"
			/>
		),
		rules: {
			required: true,
		},

	},
]);

export { getInsuranceControls, getRegistrationControls, getFileControls };
