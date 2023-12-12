const getTabMappings = ({ isGroup = false }) => {
	const TABS_MAPPING = [
		{
			label : 'Chats',
			value : 'Chats',
			show  : true,
		},
		{
			label : 'Files',
			value : 'files',
			show  : true,
		},
		{
			label : 'Organisation',
			value : 'organisation',
			show  : isGroup,
		},
		{
			label : 'Activity',
			value : 'activity',
			show  : isGroup,
		},
	];

	return TABS_MAPPING;
};

export default getTabMappings;
