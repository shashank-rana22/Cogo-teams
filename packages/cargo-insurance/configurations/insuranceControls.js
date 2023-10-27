import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { addDays } from '@cogoport/utils';

const ONE_DAY = 1;

const getRegistrationControls = ({ billingType = '', t }) => ([
	{
		name        : 'pan_number',
		label       : t('cargoInsurance:insurance_control_pan_no'),
		placeholder : t('cargoInsurance:insurance_control_pan_no_placeholder'),
		size        : 'sm',
		type        : 'text',
		rules       : {
			required : true,
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.pan_number,
				message : t('cargoInsurance:insurance_control_pan_no_err'),
			},
		},
	},
	{
		name        : 'aadharNumber',
		label       : t('cargoInsurance:insurance_control_aadhar'),
		placeholder : t('cargoInsurance:insurance_control_aadhar_placeholder'),
		size        : 'sm',
		type        : 'number',
		showEle     : billingType === 'Individual',
		rules       : {
			required : true,
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.aadhar_number,
				message : t('cargoInsurance:insurance_control_aadhar_err'),
			},
		},
	},
]);

const getInsuranceControls = ({ incotermResponse = {}, t }) => {
	const { list = [], display = false } = incotermResponse || {};
	return ([
		{
			name        : 'cargoDescription',
			label       : t('cargoInsurance:insurance_control_cargo_desc'),
			placeholder : t('cargoInsurance:insurance_control_cargo_desc_placeholder'),
			size        : 'sm',
			type        : 'text',
			rules       : {
				required: true,
			},
		},
		{
			name        : 'packageDescription',
			label       : t('cargoInsurance:insurance_control_pkg_dsc'),
			placeholder : t('cargoInsurance:insurance_control_pkg_dsc_placeholder'),
			size        : 'sm',
			type        : 'text',
			rules       : {
				required: true,
			},

		},
		{
			name                  : 'transitDate',
			label                 : t('cargoInsurance:insurance_control_sail_date'),
			placeholder           : t('cargoInsurance:insurance_control_sail_date_placeholder'),
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
			label       : t('cargoInsurance:insurance_control_risk'),
			placeholder : t('cargoInsurance:insurance_control_risk_placeholder'),
			size        : 'sm',
			type        : 'select',
			options     : [
				{ label: t('cargoInsurance:insurance_control_risk_opt1'), value: 'ALL_RISK' },
				{ label: t('cargoInsurance:insurance_control_risk_opt2'), value: 'BASIC_RISK' },
			],
			rules: {
				required: true,
			},
			disabled: true,

		},
		{
			name        : 'coverageFrom',
			label       : t('cargoInsurance:insruance_control_coverage_frm'),
			placeholder : t('cargoInsurance:insruance_control_coverage_frm_placeholder'),
			size        : 'sm',
			type        : 'text',
			rules       : {
				required: true,
			},

		},
		{
			name        : 'coverageTo',
			label       : t('cargoInsurance:insurance_control_coverage_to'),
			placeholder : t('cargoInsurance:insurance_control_coverage_to_placeholder'),
			size        : 'sm',
			type        : 'text',
			rules       : {
				required: true,
			},

		},
		{
			name        : 'invoiceNo',
			label       : t('cargoInsurance:insurance_control_invoice_no'),
			placeholder : t('cargoInsurance:insurance_control_invoice_no_placeholder'),
			size        : 'sm',
			type        : 'text',
			rules       : {
				required: true,
			},

		},
		{
			name                  : 'invoiceDate',
			label                 : t('cargoInsurance:insurance_control_invoice_date'),
			placeholder           : t('cargoInsurance:insurance_control_invoice_date_placeholder'),
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
			label       : t('cargoInsurance:insurance_control_incoterm'),
			placeholder : t('cargoInsurance:insurance_control_incoterm_placeholder'),
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

const getFileControls = ({ billingType = '', t, verificationDoc = {} }) => {
	const { aadharDoc = {}, invoiceDoc = {}, panDoc = {}, gstDoc = {} } = verificationDoc || {};

	return ([
		{
			name       : 'invoiceDoc',
			label      : t('cargoInsurance:insurance_control_invoice_doc'),
			type       : 'fileUpload',
			size       : 'sm',
			uploadDesc : t('cargoInsurance:insurance_control_invoice_doc_desc'),
			uploadIcon : (
				<Image
					src={GLOBAL_CONSTANTS.image_url.upload_icon}
					width={40}
					height={40}
					alt={t('cargoInsurance:upload')}
				/>
			),
			defaultValues: invoiceDoc?.url,

			rules: {
				required: true,
			},
		},
		{
			name       : 'panDoc',
			label      : t('cargoInsurance:insurance_control_pan_doc'),
			type       : 'fileUpload',
			size       : 'sm',
			uploadDesc : t('cargoInsurance:insurance_control_pan_doc_desc'),
			uploadIcon : (
				<Image
					src={GLOBAL_CONSTANTS.image_url.upload_icon}
					width={40}
					height={40}
					alt={t('cargoInsurance:upload')}
				/>
			),
			defaultValues: panDoc?.url,

			rules: {
				required: true,
			},

		},
		{
			name       : 'aadharDoc',
			label      : t('cargoInsurance:insurance_control_aadhar_doc'),
			type       : 'fileUpload',
			size       : 'sm',
			uploadDesc : t('cargoInsurance:insurance_control_aadhar_doc_desc'),
			uploadIcon : (
				<Image
					src={GLOBAL_CONSTANTS.image_url.upload_icon}
					width={40}
					height={40}
					alt={t('cargoInsurance:upload')}
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
			label      : t('cargoInsurance:insurance_control_gst_doc'),
			type       : 'fileUpload',
			size       : 'sm',
			uploadDesc : t('cargoInsurance:insurance_control_gst_doc_desc'),
			uploadIcon : (
				<Image
					src={GLOBAL_CONSTANTS.image_url.upload_icon}
					width={40}
					height={40}
					alt={t('cargoInsurance:upload')}
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
