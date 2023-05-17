const tableTabs = ({ listCountData = {} }) => {
	const { invited = 0, user = 0, affiliate = 0 } = listCountData;
	const tabs = [
		{
			name  : 'invited',
			title : 'Invited',
			badge : invited,
		},
		{
			name  : 'user',
			title : 'Users',
			badge : user,
		},
		{
			name  : 'affiliate',
			title : 'Affiliate',
			badge : affiliate,
		},
	];
	return { tabs };
};

export default tableTabs;
