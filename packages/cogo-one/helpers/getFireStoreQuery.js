import { orderBy, where } from 'firebase/firestore';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

const BULK_ASSIGN_SEEN_MINUTES = 15;

const TAB_WISE_QUERY_KEY_MAPPING = {
	all      : 'all_chats_base_query',
	observer : 'observer_chats_base_query',
	groups   : 'group_chats_query',
	teams    : 'teams_chats_base_query',
	contacts : 'contacts_base_query',

};

function getFireStoreQuery({
	userId,
	appliedFilters,
	isBotSession = false,
	viewType,
	activeSubTab,
}) {
	let queryFilters = [];

	let filterId = '';

	if (appliedFilters.assigned_to === 'me') {
		filterId = userId;
	} else {
		filterId = appliedFilters?.assigned_agent;
	}

	const currentTime = new Date();
	currentTime.setMinutes(currentTime.getMinutes() - BULK_ASSIGN_SEEN_MINUTES);
	const epochTimestamp = currentTime.getTime();

	Object.keys(appliedFilters).forEach(
		(item) => {
			let filtersToBeApplied = [];

			const queryFilterMapping = {
				channels   : [where('channel_type', 'in', appliedFilters[item])],
				escalation : [where('chat_status', '==', appliedFilters[item])],
				chat_tags  : [where('chat_tags', 'array-contains', appliedFilters?.chat_tags)],
				mobile_no  : [where('mobile_no', '==', appliedFilters?.mobile_no)],
				assigned_to:
				isBotSession
					? [where('spectators_ids', 'array-contains', filterId)]
					: [where('support_agent_id', '==', filterId)],
				status:
				appliedFilters[item] === 'unread'
					? [where('has_admin_unread_messages', '==', true)]
					: [],
				shipment_filters:
				appliedFilters[item]?.includes('likely_to_book_shipment')
					? [where('is_likely_to_book_shipment', '==', true)]
					: [],
				'15_min_filter':
				appliedFilters[item]?.includes('seen_by_user')
					? [
						where('last_message_document.conversation_type', '==', 'received'),
						where('last_message_document.message_type', '==', 'text'),
						where('last_message_document.created_at', '<=', epochTimestamp),
						orderBy('last_message_document.created_at', 'desc'),
					] : [],
			};

			filtersToBeApplied = queryFilterMapping?.[item] || [];

			queryFilters = [...queryFilters, ...filtersToBeApplied];
		},
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
