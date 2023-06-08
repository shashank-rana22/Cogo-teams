const DEFAULT_COUNT = 0;

const getFormatedChartData = ({ userData = {}, alloted = {} }) => {
	const {
		kyc_verified: allotedKyc = DEFAULT_COUNT,
		shipment = DEFAULT_COUNT,
		subscription = DEFAULT_COUNT,
	} = alloted;

	const {
		affiliate = DEFAULT_COUNT,
		invited = DEFAULT_COUNT,
		kyc_verified = DEFAULT_COUNT,
		signed_up = DEFAULT_COUNT,
	} = userData;

	const allottedData = [
		{
			id: "subscription",
			value: subscription,
			color: "#FCDC00",
		},
		{
			id: "kyc",
			value: allotedKyc,
			color: "#ABCD62",
		},
		{
			id: "shipment",
			value: shipment,
			color: "#88CAD1",
		},
	];

	const usersData = [
		{
			id: "invited_user",
			label: "Invited User",
			value: invited,
			color: "#7278AD",
		},
		{
			id: "signed_up_users",
			label: "Signed Up Users",
			value: signed_up,
			color: "#888FD1",
		},
		{
			id: "kyc_registered_users",
			label: "KYC Registered Users",
			value: kyc_verified,
			color: "#ABB0DE",
		},
		{
			id: "affiliate_users",
			label: "Affiliate Users",
			value: affiliate,
			color: "#CED1ED",
		},
	];

	return {
		allottedData,
		usersData,
	};
};

export default getFormatedChartData;
