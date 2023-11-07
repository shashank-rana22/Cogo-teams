function collectionPartyRejectCheckboxList(
	{
		organizationName = '',
		beneficiaryName = '',
		bankName = '',
		accountNumber = '',
		ifscCode = '',
		registrationNumber = '',
		taxNumber = '',
		swiftCode = '',
	},
) {
	return [
		{
			name  : 'Collection Party Name',
			value : 'Collection Party Name',
			label : `Collection Party Name : ${organizationName}`,
		},
		{
			name      : 'Beneficiary Name',
			value     : 'Beneficiary Name',
			label     : `Beneficiary Name : ${beneficiaryName}`,
			detectKey : 'service_provider',
		},
		{
			name      : 'Bank Name',
			value     : 'Bank Name',
			label     : `Bank Name : ${bankName}`,
			detectKey : 'bank_name',
		},
		{
			name      : 'Account Number',
			value     : 'Account Number',
			label     : `Account Number : ${accountNumber}`,
			detectKey : 'ac_number',
		},
		{
			name      : 'IFSC',
			value     : 'IFSC',
			label     : `IFSC : ${ifscCode || swiftCode}`,
			detectKey : 'ifsc_code',
		},
		{
			name      : 'PAN Number',
			value     : 'PAN Number',
			label     : `PAN Number : ${registrationNumber || ''}`,
			detectKey : 'registration_number',
		},
		{
			name      : 'GST Number',
			value     : 'GST Number',
			label     : `GST Number : ${taxNumber}`,
			detectKey : 'tax_number',
		},

	];
}
export default collectionPartyRejectCheckboxList;
