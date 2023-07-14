const getKycTabsMapping = ({ dataStats }) => {
	const kycTabsMapping = [
		{
			label : 'All',
			value : Object.values(dataStats || []).reduce((acc, curr) => acc + curr, 0),
		},
		{
			label     : 'Pending Vendors',
			valueKey  : 'kyc_pending_count',
			kycStatus : ['pending_from_user', 'pending_verification'],
		},
		{
			label     : 'Verified Vendors',
			valueKey  : 'kyc_verified_count',
			kycStatus : 'verified',
		},
		{
			label     : 'Rejected Vendors',
			valueKey  : 'kyc_rejected_count',
			kycStatus : 'rejected',
		},
	];

	return {
		kycTabsMapping,
	};
};

export default getKycTabsMapping;
