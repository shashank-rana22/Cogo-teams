const getFormatedChartData = (
	userData = {},
	alloted = {},

) => {
	const { kyc_verified: allotedKyc = 0, shipment = 0, subscription = 0 } = alloted;

	const { affiliate = 0, invited = 0, kyc_verified = 0, signed_up = 0 } = userData;

	const allottedData = [
		{
			id    : 'subscription',
			value : subscription,
			color : '#FCDC00',
		},
		{
			id    : 'kyc',
			value : allotedKyc,
			color : '#ABCD62',
		},
		{
			id    : 'shipment',
			value : shipment,
			color : '#88CAD1',
		},
	];

	const usersData = [
		{
			id    : 'invited_user',
			label : 'Invited User',
			value : invited,
			color : '#7278AD',
		},
		{
			id    : 'signed_up_users',
			label : 'Signed Up Users',
			value : signed_up,
			color : '#888FD1',
		},
		{
			id    : 'kyc_registered_users',
			label : 'KYC Registered Users',
			value : kyc_verified,
			color : '#ABB0DE',
		},
		{
			id    : 'affiliate_users',
			label : 'Affiliate Users',
			value : affiliate,
			color : '#CED1ED',
		},

	];

	return {
		allottedData,
		usersData,
	};
};

export default getFormatedChartData;
