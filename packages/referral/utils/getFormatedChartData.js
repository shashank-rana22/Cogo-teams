const getFormatedChartData = (
	userData = {},
	alloted = {},
	estimated = {},
) => {
	const { kyc_verified:allotedKyc = 0, shipment = 0, subscription = 0 } = alloted;

	const {
		kyc_verified: estimatedKyc = 0, shipment: estimatedShipment = 0,
		subscription: estimatedSubscription = 0,
	} = estimated;

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

	const estimatedData = [
		{
			id    : 'subscription',
			value : estimatedSubscription,
			color : '#FCDC00',
		},
		{
			id    : 'kyc',
			value : estimatedKyc,
			color : '#ABCD62',
		},
		{
			id    : 'shipment',
			value : estimatedShipment,
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
		{
			id    : 'employees',
			label : 'Employees',
			value : 10 || 0,
			color : '#F2F3FA',
		},

	];

	return {
		allottedData,
		estimatedData,
		usersData,
	};
};

export default getFormatedChartData;
