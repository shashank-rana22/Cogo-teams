function collectionPartyRejectCheckboxList(
	{
		organizationName,
		beneficiaryName,
		bankName,
		accountNumber,
		ifscCode,
		registrationNumber,
		taxNumber,
	},
) {
	return [
		{
			name  : 'Collection Party Name',
			value : 'Collection Party Name',
			label : `Collection Party Name - ${organizationName}`,
		},
		{
			name  : 'Beneficiary Name',
			value : 'Beneficiary Name',
			label : `Beneficiary Name - ${beneficiaryName}`,
		},
		{ name: 'Bank Name', value: 'Bank Name', label: `Bank Name - ${bankName}` },
		{ name: 'Account Number', value: 'Account Number', label: `Account Number - ${accountNumber}` },
		{ name: 'IFSC', value: 'IFSC', label: `IFSC - ${ifscCode}` },
		{ name: 'PAN Number', value: 'PAN Number', label: `PAN Number - ${registrationNumber || ''}` },
		{ name: 'GST Number', value: 'GST Number', label: `GST Number - ${taxNumber}` },

	];
}
export default collectionPartyRejectCheckboxList;
