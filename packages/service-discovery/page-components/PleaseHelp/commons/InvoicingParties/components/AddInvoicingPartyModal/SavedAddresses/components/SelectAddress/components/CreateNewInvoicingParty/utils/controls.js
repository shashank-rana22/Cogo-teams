import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMFileUploader,
	IcMInfo,
	IcMCloudUpload,
} from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import { getPanHolderStatusOptions } from './getPanHolderStatus';

function TradePartyInstructions() {
	return (
		<div>
			Please provide a proof of agreement that verifies the trade party&apos;s
			authorization to make payment on behalf of the Booking party
		</div>
	);
}

const billingAddressControls = [
	{
		name  : 'billing_party_name',
		label : 'Billing Party Name ',
		type  : 'text',
		span  : 6,
		rules : { required: true },
	},
	{
		name    : 'address_type',
		label   : 'Address Type',
		type    : 'select',
		span    : 6,
		options : [
			{
				label : 'Office',
				value : 'office',
			},
			{
				label : 'Factory Address',
				value : 'factory',
			},
			{
				label : 'Warehouse Address',
				value : 'warehouse',
			},
		],
		rules: { required: true },
	},
	{
		label    : 'Country of Registration',
		name     : 'country_id',
		type     : 'async-select',
		asyncKey : 'list_locations',
		params   : {
			filters    : { status: 'active', type: ['country'] },
			page_limit : 10,
			sort_by    : 'name',
			sort_type  : 'asc',
			includes   : { country: null, default_params_required: true },
		},
		defaultOptions : true,
		span           : 6,
		rules          : {
			required: true,
		},
	},
	{
		type     : 'async-select',
		name     : 'pincode',
		label    : 'Pincode',
		asyncKey : 'list_locations',
		labelKey : 'postal_code',
		valueKey : 'postal_code',
		params   : {
			filters    : { status: 'active', type: ['pincode'] },
			page_limit : 10,
			sort_by    : 'name',
			sort_type  : 'asc',
			includes   : { country: null, default_params_required: true },
		},
		caret : true,
		rules : {
			required: true,
		},
		span: 6,
	},
	{
		name      : 'tax_number',
		label     : 'GST Number',
		type      : 'text',
		span      : 6,
		maxLength : 15,

		rules: {
			required : true,
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.gst_number,
				message : 'GST is invalid',
			},
		},
	},
	{
		name       : 'tax_number_document_url',
		label      : 'GST Proof',
		type       : 'file-uploader',
		drag       : true,
		uploadIcon : () => <IcMCloudUpload size={2} />,
		span       : 6,
		uploadType : 'aws',
		height     : 45,
		rules      : { required: true },
	},
	{
		name  : 'address',
		label : 'Billing Address',
		type  : 'textarea',
		span  : 6,
		rules : { required: true },
	},
	{
		name     : 'is_sez',
		type     : 'checkbox_group',
		span     : 12,
		options  : [{ value: 'addressIsSez', label: 'Is Sez' }],
		multiple : true,
	},
	{
		name       : 'sez_proof',
		label      : 'SEZ Proof',
		type       : 'file-uploader',
		drag       : true,
		span       : 12,
		uploadType : 'aws',
		height     : 45,
		uploadIcon : () => <IcMCloudUpload size={2} />,
		rules      : { required: true },
	},
];

const pocControls = [
	{
		name  : 'name',
		label : 'POC Name',
		type  : 'text',
		span  : 6,
		rules : { required: true },
	},
	{
		name  : 'email',
		label : 'POC Email',
		type  : 'email',
		span  : 6,
		rules : {
			required : 'Please provide a valid email id',
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : 'Please provide us your valid email address',
			},
		},
	},
	{
		name      : 'mobile_number',
		label     : 'POC Mobile Number',
		type      : 'mobile-number-select',
		codeKey   : 'mobile_country_code',
		numberKey : 'mobile_number',
		span      : 6,
		rules     : {
			required : true,
			validate : (value) => (value.mobile_country_code && value.mobile_number
				? undefined
				: 'POC Mobile Number is Required'),
		},
	},
	{
		name      : 'alternate_mobile_number',
		label     : 'Alternate Mobile Number',
		type      : 'mobile-number-select',
		codeKey   : 'mobile_country_code',
		numberKey : 'mobile_number',
		span      : 6,
	},
];

const pocControlsFieldArray = [
	{
		name  : 'poc_details',
		type  : 'fieldArray',
		label : 'POC Details',
		value : [
			{
				name                    : '',
				email                   : '',
				mobile_number           : {},
				alternate_mobile_number : {},
			},
		],
		controls: pocControls,
	},
];

const orgControls = [
	{
		type           : 'async-select',
		name           : 'country_id',
		label          : 'Country of Registration',
		asyncKey       : 'list_locations',
		defaultOptions : true,
		params         : {
			filters    : { status: 'active', type: ['country'] },
			page_limit : 10,
			sort_by    : 'name',
			sort_type  : 'asc',
			includes   : { country: null, default_params_required: true },
		},
		caret : true,
		rules : {
			required: true,
		},
		span: 6,
	},
	{
		label     : 'PAN/Registration Number',
		name      : 'registration_number',
		type      : 'text',
		className : 'uppercase',
		span      : 6,
		rules     : {
			required: true,
		},
	},
	{
		name  : 'business_name',
		label : 'Business name',
		type  : 'text',
		span  : 6,
		rules : {
			required: true,
		},
	},
	{
		name        : 'company_type',
		label       : 'Type of Company',
		type        : 'select',
		caret       : true,
		isClearable : true,
		span        : 6,
		options     : getPanHolderStatusOptions(),
		rules       : { required: true },
	},
	{
		name  : 'verification_document',
		label : (
			<div style={{ display: 'flex' }}>
				Trade Party Verification document
				<Tooltip
					content={<TradePartyInstructions />}
					placement="top"
					caret={false}
				>
					<div>
						<IcMInfo className="image" fill="red" />
					</div>
				</Tooltip>
			</div>
		),
		type       : 'file-uploader',
		drag       : true,
		uploadIcon : () => <IcMFileUploader height={30} width={30} />,
		span       : 6,
		uploadType : 'aws',
		height     : 45,
		rules      : { required: true },
	},
];

const ADDITIONAL_ORG_CONTROLS = [
	// {
	// 	name: 'tds_deduction_type',
	// 	label: 'TDS Type',
	// 	type: 'select',
	// 	caret: true,
	// 	span: 4,
	// 	options: [
	// 		{ value: 'normal', label: 'Normal' },
	// 		{ value: 'no_deduction', label: 'No Deduction' },
	// 		{ value: 'lower_deduction', label: 'Lower Deduction' },
	// 	],
	// 	multiple: false,
	// 	placeholder: 'Select TDS Type',
	// 	rules: { required: true },
	// },
	// {
	// 	name: 'tds_deduction_style',
	// 	label: 'TDS Style',
	// 	type: 'select',
	// 	caret: true,
	// 	span: 4,
	// 	options: [
	// 		{ value: 'gross', label: 'Gross' },
	// 		{ value: 'net', label: 'Net' },
	// 		{ value: 'exempt', label: 'Exempt' },
	// 	],
	// 	multiple: false,
	// 	placeholder: 'Select TDS Style',
	// 	rules: { required: true },
	// },
	// {
	// 	name: 'tds_deduction_rate',
	// 	label: 'TDS Rate (%)',
	// 	span: 4,
	// 	type: 'number',
	// 	placeholder: 0,
	// 	rules: { required: '% is required', min: 0, max: 40 },
	// },
	// {
	// 	name: 'tds_certificate',
	// 	label: 'Tds Certificate',
	// 	type: 'file-uploader',
	// 	drag: true,
	// 	span: 12,
	// 	uploadType: 'aws',
	// 	height: 45,
	// 	uploadIcon: () => <UploadIconSvg size={2} />,
	// },
	// {
	// 	name: 'tds_certificate_number',
	// 	label: 'TDS Certificate No.',
	// 	type: 'text',
	// 	span: 4,
	// 	placeholder: 'XXXXXXXXXXX',
	// },
	// {
	// 	name: 'tds_certificate_start_date',
	// 	label: 'TDS Certificate Start Date',
	// 	type: 'datepicker',
	// 	span: 4,
	// },
	// {
	// 	name: 'tds_certificate_end_date',
	// 	label: 'TDS Certificate End Date',
	// 	type: 'datepicker',
	// 	span: 4,
	// },
];

const bankAccountControls = [
	{
		name  : 'ifsc_number',
		label : 'IFSC Code',
		type  : 'text',
		span  : 6,
		rules : { required: 'IFSC code is required' },
	},
	{
		name  : 'account_holder_name',
		label : 'Account Holder Name',
		type  : 'text',
		span  : 6,
		rules : { required: 'Account Holder Name is required' },
	},
	{
		name  : 'bank_account_number',
		label : 'Bank Account Number',
		type  : 'text',
		span  : 6,
		rules : { required: 'Bank account number is required' },
	},
	{
		name  : 'bank_name',
		label : 'Bank Name',
		type  : 'text',
		span  : 6,
		rules : { required: true },
	},
	{
		name  : 'branch_name',
		label : 'Branch Name',
		type  : 'text',
		span  : 6,
		rules : { required: 'Branch Name is required' },
	},
	{
		name       : 'image_url',
		label      : 'Upload Cancelled Cheque',
		type       : 'file-uploader',
		drag       : true,
		uploadIcon : () => <IcMCloudUpload size={2} />,
		span       : 6,
		uploadType : 'aws',
		height     : 45,
		rules      : { required: true },
	},
];

const documentsControls = [
	{
		name       : 'company_existence_proof',
		label      : 'Company Existence Proof',
		type       : 'file-uploader',
		drag       : true,
		uploadIcon : () => <IcMCloudUpload size={2} />,
		span       : 6,
		uploadType : 'aws',
		height     : 45,
		rules      : { required: true },
	},
	{
		name       : 'indemnification',
		label      : 'Indemnification',
		type       : 'file-uploader',
		drag       : true,
		uploadIcon : () => <IcMCloudUpload size={2} />,
		span       : 6,
		uploadType : 'aws',
		height     : 45,
		rules      : { required: true },
	},
	{
		name  : 'verification_document',
		label : (
			<div style={{ display: 'flex' }}>
				Trade Party Verification document
				<Tooltip
					content={<TradePartyInstructions />}
					placement="top"
					caret={false}
				>
					<div style={{ marginLeft: '10px' }}>
						<IcMInfo fill="red" />
					</div>
				</Tooltip>
			</div>
		),
		type       : 'file-uploader',
		drag       : true,
		uploadIcon : () => <IcMFileUploader height={30} width={30} />,
		span       : 6,
		uploadType : 'aws',
		height     : 45,
		rules      : { required: true },
	},
];

const otherAddressesControls = [
	{
		name  : 'name',
		label : 'Billing Party Name ',
		type  : 'text',
		span  : 6,
		rules : { required: true },
	},
	{
		name    : 'address_type',
		label   : 'Address Type',
		type    : 'select',
		span    : 6,
		options : [
			{
				label : 'Office',
				value : 'office',
			},
			{
				label : 'Factory Address',
				value : 'factory',
			},
			{
				label : 'Warehouse Address',
				value : 'warehouse',
			},
		],
		rules: { required: true },
	},
	{
		name           : 'country_id',
		label          : 'Country',
		type           : 'select',
		optionsListKey : 'countries',
		span           : 6,
		rules          : { required: true },
	},
	{
		type           : 'async-select',
		name           : 'pincode',
		label          : 'Pincode',
		asyncKey       : 'list_locations',
		labelKey       : 'postal_code',
		valueKey       : 'postal_code',
		defaultOptions : true,
		params         : {
			filters    : { status: 'active', type: ['pincode'] },
			page_limit : 10,
			sort_by    : 'name',
			sort_type  : 'asc',
			includes   : { country: null, default_params_required: true },
		},
		caret : true,
		rules : {
			required: true,
		},
		span: 6,
	},
	{
		name  : 'address',
		label : 'Billing Address',
		type  : 'textarea',
		span  : 6,
		rules : { required: true },
	},
];

const docControls = {
	iec: [
		{
			label : 'IEC Code',
			name  : 'identity_number',
			type  : 'text',
			span  : 6,
			rules : { required: true },
		},
	],
	pan: [
		{
			label : 'PAN',
			name  : 'identity_number',
			type  : 'text',
			span  : 6,
			rules : {
				required : 'PAN is required',
				pattern  : {
					value   : GLOBAL_CONSTANTS.regex_patterns.pan_number,
					message : 'PAN is invalid',
				},
			},
		},
	],
	wca: [
		{
			label : 'WCA License Number',
			name  : 'identity_number',
			type  : 'text',
			span  : 6,
			rules : { required: true },
		},
	],
	iata: [
		{
			label : 'IATA License Code',
			name  : 'identity_number',
			type  : 'text',
			span  : 6,
			rules : { required: true },
		},
	],
};

const docs = {
	org_documents: [
		'pan',
		'iec',
		'business_address_proof',
		'authority_letter',
		'iata',
		'wca',
	],
};

const docControlsForTp = ({
	selectedDocumentType,
	setSelectedDocumentType = () => {},
	editAdditionalTpDetails = {},
}) => {
	const controls = [
		{
			label   : 'Document Type',
			name    : 'document_type',
			type    : 'select',
			options : docs.org_documents.map((doc) => ({
				label : startCase(doc),
				value : doc,
			})),
			span  : 6,
			rules : { required: true },

			handleChange: (obj = {}) => {
				setSelectedDocumentType(obj || {});
			},
		},
		...(docControls[selectedDocumentType.value] || []),
		{
			name       : 'image_url',
			label      : 'Upload Document',
			type       : 'file-uploader',
			drag       : true,
			uploadIcon : () => <IcMCloudUpload size={2} />,
			span       : 12,
			uploadType : 'aws',
			height     : 45,
			rules      : { required: true },
		},
	];

	return controls.map((control) => {
		const { name } = control;
		const { data = {} } = editAdditionalTpDetails;

		if (name === 'identity_number') {
			return { ...control, value: data[name] || '' };
		}
		return { ...control, value: editAdditionalTpDetails[name] || '' };
	});
};

export const getBillingAddressControls = ({ values = {} }) => billingAddressControls.map((control) => {
	const { name } = control;

	// if (name === 'is_sez') {
	// 	return { ...control, value: values[name] ? ['jn'] : [] };
	// }

	return { ...control, value: values[name] || '' };
});

export const getOrgControls = ({ values = {} }) => orgControls.map((control) => {
	const { name = '' } = control;

	return { ...control, value: values[name] || '' };
});

export const getAdditionalOrgControls = ({ values = {} }) => ADDITIONAL_ORG_CONTROLS.map((control) => ({
	...control,
	value: values[control.name] || '',
}));

const getPocControlsValues = ({ values: valuesProps }) => {
	const values = valuesProps || {};

	const HASH = {};
	pocControls.forEach((control) => {
		const { name: controlName } = control;

		HASH[controlName] = values[controlName];

		if (controlName === 'mobile_number') {
			const { mobile_country_code, mobile_number } = values;

			HASH[controlName] = {
				mobile_country_code,
				mobile_number,
			};
		}

		if (controlName === 'alternate_mobile_number') {
			const { alternate_mobile_number_country_code, alternate_mobile_number } = values;

			HASH[controlName] = {
				mobile_country_code : alternate_mobile_number_country_code,
				mobile_number       : alternate_mobile_number,
			};
		}
	});

	return HASH;
};

export const getPocControlsFieldArray = ({ values: valuesProps = {} }) => {
	const values = valuesProps || {};

	return pocControlsFieldArray.map((control) => {
		const { name: controlName } = control;

		if (controlName === 'poc_details') {
			if (!isEmpty(values[controlName])) {
				return {
					...control,
					value: (values[controlName] || []).map((value) => getPocControlsValues(value)),
				};
			}
		}

		return { ...control, value: values[controlName] || '' };
	});
};

export const getPocControls = ({ values: valuesProps }) => {
	const values = valuesProps || {};

	const pocValues = getPocControlsValues({ values });

	return pocControls.map((control) => {
		const { name: controlName } = control;

		return { ...control, value: pocValues[controlName] || '' };
	});
};

export const getBankAccountControls = ({ values = {} }) => bankAccountControls.map((control) => {
	const { name = '' } = control;
	const { data = {} } = values;

	if (name === 'image_url') {
		return { ...control, value: values[name] || '' };
	}

	return { ...control, value: data[name] || values[name] || '' };
});

export const getDocumentControls = ({ values = {} }) => documentsControls.map((control) => ({
	...control,
	value: values[control.name] || '',
}));

export const getOtherAddressControls = ({ values = {} }) => otherAddressesControls.map((control) => ({
	...control,
	value: values[control.name] || '',
}));

export const getControlsForAddingTpDetails = ({
	editAdditionalTpDetails = {},
	activeTabFromList = 'billing_address',
	selectedDocumentType = '',
	setSelectedDocumentType = () => {},
}) => {
	switch (activeTabFromList) {
		case 'billing_address':
			return [
				...getBillingAddressControls({ values: editAdditionalTpDetails }),
				...getPocControls({ values: editAdditionalTpDetails }),
				...getPocControlsFieldArray({ values: editAdditionalTpDetails }),
			];

		case 'other_address':
			return [
				...getOtherAddressControls({ values: editAdditionalTpDetails }),
				...getPocControls({ values: editAdditionalTpDetails }),
				...getPocControlsFieldArray({ values: editAdditionalTpDetails }),
			];

		case 'bank_details':
			return getBankAccountControls({ values: editAdditionalTpDetails });

		case 'documents':
			return docControlsForTp({
				selectedDocumentType,
				setSelectedDocumentType,
				editAdditionalTpDetails,
			});

		default:
			return '';
	}
};

export const getPocFieldArray = ({ action = '', pocValues = {} }) => {
	const VALUES = [];

	if (action === 'create') {
		const HASH = {};
		pocControls.forEach((control) => {
			HASH[control.name] = '';
		});

		VALUES[GLOBAL_CONSTANTS.zeroth_index] = HASH;
	}

	return [
		{
			type     : 'fieldArray',
			name     : 'poc_details',
			label    : 'POC Details',
			controls : pocControls,
			value    : pocValues?.poc_details || VALUES,
		},
	];
};
