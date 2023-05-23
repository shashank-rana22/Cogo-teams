const cogopointsMapping = (network_bonus, referral_bonus) => {
	const bonusPoints = [
		{
			title  : 'Referral Bonus',
			points : referral_bonus,
		},
		{
			title  : 'Network Bonus',
			points : network_bonus,
		},

	];

	return {
		bonusPoints,
	};
};

export default cogopointsMapping;
