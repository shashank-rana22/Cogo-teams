const userProfile = ({
	referralCogopointEarned,
	referralCogopointEstimated,
	networkCogopointEarned,
	networkCogopointEstimated,
}) => {
	const userReferralData = [
		{
			label : 'Earned',
			value : referralCogopointEarned,
		},
		{
			label : 'Estimated',
			value : referralCogopointEstimated,
		},
	];

	const networkReferralData = [
		{
			label : 'Earned',
			value : networkCogopointEarned,
		},
		{
			label : 'Estimated',
			value : networkCogopointEstimated,
		},
	];

	return { userReferralData, networkReferralData };
};

export default userProfile;
