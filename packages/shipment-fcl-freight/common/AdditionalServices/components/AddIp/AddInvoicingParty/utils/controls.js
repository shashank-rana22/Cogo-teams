import { Tooltip } from '@cogoport/components';
import PATTERNS from '@cogoport/constants/patterns';
import { IcMFileUploader, IcMInfo } from '@cogoport/icons-react';
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
		label          : 'Country of Registration',
		name           : 'country_id',
		type           : 'location-select',
		optionsListKey : 'locations',
		params         : { filters: { type: ['country'] } },
		defaultOptions : true,
		span           : 6,
		rules          : {
			required: true,
		},
	},
	{
		name           : 'pincode',
		label          : 'Pincode',
		labelKey       : 'postal_code',
		valueKey       : 'postal_code',
		type           : 'location-select',
		optionsListKey : 'locations',
		params         : { filters: { type: ['pincode'] } },
		caret          : true,
		span           : 6,
		rules          : { required: true },
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
				value   : PATTERNS.GST_NUMBER,
				message : 'GST is invalid',
			},
		},
	},
	{
		name       : 'tax_number_document_url',
		label      : 'GST Proof',
		type       : 'file',
		drag       : true,
		uploadIcon : () => <UploadIconSvg size={2} />,
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
		type     : 'checkbox',
		span     : 12,
		options  : [{ value: 'addressIsSez', label: 'Is Sez' }],
		multiple : true,
	},
	{
		name       : 'sez_proof',
		label      : 'SEZ Proof',
		type       : 'file',
		drag       : true,
		span       : 12,
		uploadType : 'aws',
		height     : 45,
		uploadIcon : () => {
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/doc-attach-icon.svg"
				alt="doc attach icon"
				width="20"
				height="20"
			/>;
		},
		rules: { required: true },
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
				value   : PATTERNS.EMAIL,
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
		label          : 'Country of Registration',
		name           : 'country_id',
		type           : 'location-select',
		optionsListKey : 'locations',
		params         : { filters: { type: ['country'] } },
		defaultOptions : true,
		span           : 6,
		rules          : {
			required: true,
		},
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
		options     : getPanHolderStatusOptions(),
		rules       : { required: true },
	},
	{
		name  : 'verification_document',
		label : (
			<div>
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
		type       : 'file',
		drag       : true,
		uploadIcon : () => <IcMFileUploader height={30} width={30} />,
		span       : 6,
		uploadType : 'aws',
		height     : 45,
		rules      : { required: true },
	},
];

const additionalOrgControls = [
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
	// 	type: 'file',
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
		type       : 'file',
		drag       : true,
		uploadIcon : () => <UploadIconSvg size={2} />,
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
		type       : 'file',
		drag       : true,
		uploadIcon : () => <UploadIconSvg size={2} />,
		span       : 6,
		uploadType : 'aws',
		height     : 45,
		rules      : { required: true },
	},
	{
		name       : 'indemnification',
		label      : 'Indemnification',
		type       : 'file',
		drag       : true,
		uploadIcon : () => <UploadIconSvg size={2} />,
		span       : 6,
		uploadType : 'aws',
		height     : 45,
		rules      : { required: true },
	},
	{
		name  : 'verification_document',
		label : (
			<div>
				Trade Party Verification document
				<Tooltip
					content={<TradePartyInstructions />}
					placement="top"
					caret={false}
				>
					<div>
						<IcMInfo fill="red" />
					</div>
				</Tooltip>
			</div>
		),
		type       : 'file',
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
		name           : 'pincode',
		label          : 'Pincode',
		labelKey       : 'postal_code',
		valueKey       : 'postal_code',
		type           : 'location-select',
		optionsListKey : 'locations',
		params         : { filters: { type: ['pincode'] } },
		caret          : true,
		span           : 6,
		rules          : { required: true },
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
					value   : PATTERNS.PAN_NUMBER,
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
			type       : 'file',
			drag       : true,
			uploadIcon : () => <UploadIconSvg size={2} />,
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

export const getAdditionalOrgControls = ({ values = {} }) => additionalOrgControls.map((control) => ({ ...control, value: values[control.name] || '' }));

const getPocControlsValues = ({ values: valuesProps }) => {
	const values = valuesProps || {};

	const valuesHash = {};
	pocControls.forEach((control) => {
		const { name: controlName } = control;

		valuesHash[controlName] = values[controlName];

		if (controlName === 'mobile_number') {
			const { mobile_country_code, mobile_number } = values;

			valuesHash[controlName] = {
				mobile_country_code,
				mobile_number,
			};
		}

		if (controlName === 'alternate_mobile_number') {
			const { alternate_mobile_number_country_code, alternate_mobile_number } =				values;

			valuesHash[controlName] = {
				mobile_country_code : alternate_mobile_number_country_code,
				mobile_number       : alternate_mobile_number,
			};
		}
	});

	return valuesHash;
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

export const getDocumentControls = ({ values = {} }) => documentsControls.map((control) => ({ ...control, value: values[control.name] || '' }));

export const getOtherAddressControls = ({ values = {} }) => otherAddressesControls.map((control) => ({ ...control, value: values[control.name] || '' }));

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
	const values = [];
	if (action === 'create') {
		const hash = {};
		pocControls.forEach((control) => {
			hash[control.name] = '';
		});

		values[0] = hash;
	}

	return [
		{
			type     : 'fieldArray',
			name     : 'poc_details',
			label    : 'POC Details',
			controls : pocControls,
			value    : pocValues?.poc_details || values,
		},
	];
};
