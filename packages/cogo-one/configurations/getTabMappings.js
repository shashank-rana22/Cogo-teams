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
			label : 'Calls',
			value : 'voice',
			show  : geo.others.navigations.cogo_one.has_voice_call_access,
		},
		{
			label : 'Outlook',
			value : 'outlook',
			show  : true,
		},
		{
			label : 'Mails',
			value : 'firebase_email',
			show  : true,
		},
	];
};

export default getTabMappings;
