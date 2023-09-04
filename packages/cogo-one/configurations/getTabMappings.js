import getGeoConstants from '@cogoport/globalization/constants/geo';

const getTabMappings = ({ unReadChatsCount, unReadMissedCallCount = 0 }) => {
	const geo = getGeoConstants();

	return [
		{
			label : 'Chats',
			value : 'message',
			badge : unReadChatsCount,
			show  : true,
		},
		{
			label : 'Calls',
			value : 'voice',
			badge : unReadMissedCallCount,
			show  : geo.others.navigations.cogo_one.has_voice_call_access,
		},
		{
			label : 'Mail',
			value : 'mail',
			show  : true,
		},
	];
};

export default getTabMappings;
