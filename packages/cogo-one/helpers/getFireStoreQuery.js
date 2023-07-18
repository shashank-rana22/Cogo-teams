import { orderBy } from 'firebase/firestore';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

import getQueryFilterMapping from './getQueryFilterMapping';

const BULK_ASSIGN_SEEN_MINUTES = 15;

const TAB_WISE_QUERY_KEY_MAPPING = {
	all         : 'all_chats_base_query',
	observer    : 'observer_chats_base_query',
	groups      : 'group_chats_query',
	teams       : 'teams_chats_base_query',
	contacts    : 'contacts_base_query',
	kamContacts : 'kam_contacts_base_query',
};

function getFireStoreQuery({
	userId,
	appliedFilters,
	isBotSession = false,
	viewType,
	activeSubTab,
}) {
	const filterId = appliedFilters.assigned_to === 'me'
		? userId
		: appliedFilters?.assigned_agent;

	const currentTime = new Date();
	currentTime.setMinutes(currentTime.getMinutes() - BULK_ASSIGN_SEEN_MINUTES);
	const epochTimestamp = currentTime.getTime();

	const queryFilterMapping = getQueryFilterMapping({
		appliedFilters,
		isBotSession,
		epochTimestamp,
		filterId,
	});

	const queryFilters = Object.keys(appliedFilters).reduce(
		(accumulator, currentValue) => [
			...accumulator,
			...(queryFilterMapping?.[currentValue] || []),
		],
		[],
	);

	const tabWiseQuery = (
		VIEW_TYPE_GLOBAL_MAPPING[viewType]?.[TAB_WISE_QUERY_KEY_MAPPING[activeSubTab]]?.({
			agentId: userId,
		}) || []
	);

	const sessionTypeQuery = (
		VIEW_TYPE_GLOBAL_MAPPING[viewType]?.session_type_query?.({
			sessionType        : isBotSession ? 'bot' : 'admin',
			isContactsSelected : activeSubTab === 'contacts',
		}) || []
	);

	return [
		...tabWiseQuery,
		...sessionTypeQuery,
		...queryFilters,
		orderBy('new_message_sent_at', 'desc'),
	];
}

export default getFireStoreQuery;
