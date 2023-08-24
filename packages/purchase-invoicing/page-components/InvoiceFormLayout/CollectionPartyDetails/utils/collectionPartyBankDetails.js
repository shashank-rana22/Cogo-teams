const collectionPartyBankDetails = ({ collectionPartyAddress, collectionPartyBank, collectionParty }) => [
	{
		label : 'BankDetails:',
		value : `${collectionPartyBank?.data?.bank_name || '-'} / ${collectionPartyBank?.data?.branch_name || '-'}`,
	},
	{
		label : 'AccountNumber :',
		value : `${collectionPartyBank?.data?.bank_account_number || '-'}`,
	},
	{
		label : 'IFSC :',
		value : `${collectionPartyBank?.data?.ifsc_number || collectionPartyBank?.data?.swift_number || '-'}`,
	},
	{
		label : 'PAN Number :',
		value : `${collectionParty?.registration_number || '-'}`,
	},
	{
		label : 'GST Number :',
		value : `${collectionPartyAddress?.tax_number || '-'}`,
	},
	{
		label : 'Beneficiary Name :',
		value : `${collectionPartyBank?.data?.account_holder_name || '-'}`,
	},
];

export default collectionPartyBankDetails;
