import getGeoConstants from '@cogoport/globalization/constants/geo';

const getTabMappings = ({ unReadChatsCount }) => {
	const geo = getGeoConstants();

	return [
		{
			label : 'Chats',
			value : 'message',
			badge : unReadChatsCount,
			show  : true,
		},
		{
			label : 'Voice',
			value : 'voice',
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
