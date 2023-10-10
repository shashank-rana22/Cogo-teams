import getGeoConstants from '@cogoport/globalization/constants/geo';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

const MAX_COUNT = 99;

const getTabMappings = ({
	unReadChatsCount = 0,
	unReadMailsCount = 0,
	unReadMissedCallCount = 0,
	viewType = '',
	unreadTeamsCount = 0,
}) => {
	const geo = getGeoConstants();
	const tabsToBeShown = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.chat_tabs_to_be_shown || [];

	const TABS_MAPPING = [
		{
			label : 'Chats',
			value : 'message',
			badge : unReadChatsCount > MAX_COUNT ? '99+' : unReadChatsCount,
			show  : true,
		},
		{
			label : 'Calls',
			value : 'voice',
			badge : unReadMissedCallCount > MAX_COUNT ? '99+' : unReadMissedCallCount,
			show  : geo.others.navigations.cogo_one.has_voice_call_access,
		},
		{
			label : 'Mails',
			value : 'outlook',
			show  : true,
		},
		{
			label : 'Mails',
			value : 'firebase_emails',
			badge : unReadMailsCount > MAX_COUNT ? '99+' : unReadMailsCount,
			show  : true,
		},
		{
			label : 'Teams',
			value : 'teams',
			show  : true,
			badge : unreadTeamsCount > MAX_COUNT ? '99+' : unreadTeamsCount,
		},
	];

	return TABS_MAPPING.filter((itm) => tabsToBeShown.includes(itm.value) && itm.show);
};

export default getTabMappings;
