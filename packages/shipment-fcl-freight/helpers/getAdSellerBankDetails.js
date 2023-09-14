const getAdSellerBankDetails = ({ collectionPartyBankDetails = {}, collectionParty = {} }) => {
	const { data = {}, id = '' } = collectionPartyBankDetails || {};

	const {
		bank_account_number = '',
		bank_name = '',
		branch_name = '',
		ifsc_number = '',
	} = data || {};

	return {
		bankId            : id,
		collectionPartyId : collectionParty?.id,
		bankName          : bank_name,
		branchName        : branch_name,
		ifscCode          : ifsc_number,
		accountNumber     : bank_account_number,
	};
};

export default getAdSellerBankDetails;
