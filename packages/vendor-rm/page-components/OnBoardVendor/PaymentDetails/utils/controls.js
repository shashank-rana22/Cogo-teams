import { getCountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';
import { IcMCloudUpload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

const getControls = ({ country_id }) => {
	const taxLabel = getCountrySpecificData({
		country_id,
		accessorType  : 'registration_number',
		accessor      : 'label',
		isDefaultData : true,
	});

	const patternValueRegistration = getCountrySpecificData({
		country_id,
		accessorType  : 'registration_number',
		accessor      : 'pattern',
		isDefaultData : true,
	});

	const bankingCode = getCountrySpecificData({
		country_id,
		accessorType  : 'banking_code',
		accessor      : 'financial_system_code',
		isDefaultData : true,
	});

	const patternValueBankingCode = getCountrySpecificData({
		country_id,
		accessorType  : 'banking_code',
		accessor      : 'pattern',
		isDefaultData : true,
	});

	const controls = [
		{
			name        : `${bankingCode}_code`,
			label       : `${startCase(bankingCode)} Code`,
			type        : 'text',
			style       : { flexBasis: '30%' },
			maxLength   : 11,
			placeholder : 'Select Organization Type',
			rules       : {
				pattern: {
					value   : patternValueBankingCode,
					message : `Enter a valid ${bankingCode} number`,
				},
			},
		},
		{
			name        : 'bank_name',
			label       : 'Bank Name',
			style       : { flexBasis: '30%' },
			placeholder : 'Name of the Bank',
			rules       : { required: 'Bank Name is required' },

		},
		{
			name        : 'branch_name',
			label       : 'Branch Name',
			style       : { flexBasis: '30%' },
			placeholder : 'Type here to search',
			rules       : { required: 'Branch Name is required' },

		},
		{
			name        : 'account_holder_name',
			label       : 'Account Holder Name',
			type        : 'text',
			style       : { flexBasis: '30%' },
			placeholder : 'Enter Account Holder Name',
			rules       : { required: 'Account Holder Name is required' },
		},
		{
			name        : 'account_number',
			label       : 'Account Number',
			type        : 'text',
			style       : { flexBasis: '30%' },
			placeholder : 'Enter Account Number',
			rules       : { required: 'Account Number is Required' },
		},
		{
			name    : 'account_type',
			label   : 'Account Type',
			type    : 'select',
			style   : { flexBasis: '30%' },
			options : [
				{ label: 'Savings', value: 'savings' },
				{ label: 'Current', value: 'current' }],
			placeholder : 'Select Account Type',
			rules       : { required: 'Account Type is required' },
		},
		{
			name            : 'bank_document_url',
			showLabel       : false,
			label           : 'Upload Cancelled Cheque or Passbook front page',
			type            : 'file',
			style           : { flexBasis: '100%' },
			themeType       : 'secondary',
			draggable       : true,
			uploadIcon      : <IcMCloudUpload height={56} width={56} />,
			onlyURLOnChange : true,
			accept          : 'image/*,.pdf,.doc,.docx',
			uploadType      : 'aws',
			rules           : { required: 'Bank document is required' },
		},
		{
			name        : 'name',
			label       : 'Billing Party Name',
			type        : 'text',
			style       : { flexBasis: '47%' },
			placeholder : 'Enter Billing Party Name',
			rules       : { required: 'Billing Party Name is required' },
		},
		{
			name        : 'pincode_id',
			label       : 'Pincode',
			type        : 'select',
			style       : { flexBasis: '47%' },
			placeholder : 'Select options',
			rules       : { required: 'Pincode is Required' },
		},
		{
			name        : 'address',
			label       : 'Address',
			type        : 'text',
			style       : { flexBasis: '47%' },
			placeholder : 'Enter Address',
			rules       : { required: 'Address is Required' },
		},
		{
			name        : 'tax_number',
			label       : `${taxLabel} Number`,
			type        : 'text',
			style       : { flexBasis: '47%' },
			placeholder : `Enter ${taxLabel}`,
			rules       : {
				pattern: {
					value   : patternValueRegistration,
					message : `Enter a valid ${taxLabel} number`,
				},
			},
		},
		{
			name            : 'tax_document_url',
			showLabel       : false,
			label           : `Upload ${taxLabel} Certificate`,
			type            : 'file',
			style           : { flexBasis: '100%' },
			themeType       : 'secondary',
			draggable       : true,
			uploadIcon      : <IcMCloudUpload height={56} width={56} />,
			onlyURLOnChange : true,
			accept          : 'image/*,.pdf,.doc,.docx',
			uploadType      : 'aws',
		},
	];

	return {
		bankingCode,
		controls,
	};
};

export default getControls;
