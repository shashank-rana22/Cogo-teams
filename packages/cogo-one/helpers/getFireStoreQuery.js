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

	Object.keys(appliedFilters).forEach((item) => {
		if (item === 'channels') {
			queryFilters = [
				...queryFilters,
				where('channel_type', 'in', appliedFilters[item]),
			];
		} else if (item === 'status') {
			if (appliedFilters[item] === 'unread') {
				queryFilters = [
					...queryFilters,
					where('has_admin_unread_messages', '==', true),
				];
			}
		} else if (item === 'escalation') {
			queryFilters = [
				...queryFilters,
				where('chat_status', '==', appliedFilters[item]),
			];
		} else if (item === 'assigned_to') {
			let filterId = '';
			if (appliedFilters.assigned_to === 'me') {
				filterId = userId;
			} else {
				filterId = appliedFilters?.assigned_agent;
			}
			queryFilters = [
				...queryFilters,
				!isBotSession ? where('support_agent_id', '==', filterId)
					: where('spectators_ids', 'array-contains', filterId),
			];
		} else if (item === 'chat_tags') {
			queryFilters = [
				...queryFilters,
				where('chat_tags', 'array-contains', appliedFilters?.chat_tags),
			];
		} else if (item === 'shipment_filters' && appliedFilters[item]?.includes('likely_to_book_shipment')) {
			queryFilters = [
				...queryFilters,
				where('is_likely_to_book_shipment', '==', true),
			];
		} else if (item === 'mobile_no') {
			queryFilters = [
				...queryFilters,
				where('mobile_no', '==', appliedFilters?.mobile_no),
			];
		} else if (item === '15_min_filter' && appliedFilters[item]?.includes('seen_by_user')) {
			const currentTime = new Date();
			currentTime.setMinutes(currentTime.getMinutes() - BULK_ASSIGN_SEEN_MINUTES);
			const epochTimestamp = currentTime.getTime();

			queryFilters = [
				...queryFilters,
				where('last_message_document.conversation_type', '==', 'received'),
				where('last_message_document.message_type', '==', 'text'),
				where('last_message_document.created_at', '<=', epochTimestamp),
				orderBy('last_message_document.created_at', 'desc'),
			];
		}
	});

	const tabWiseQuery = (VIEW_TYPE_GLOBAL_MAPPING[viewType]?.[TAB_WISE_QUERY_KEY_MAPPING[activeSubTab]]?.(
		{ agentId: userId },
	) || []);

	const sessionTypeQuery = (VIEW_TYPE_GLOBAL_MAPPING[viewType]?.session_type_query?.(
		{ sessionType: isBotSession ? 'bot' : 'admin', isContactsSelected: activeSubTab === 'contacts' },
	) || []);

	const firestoreQuery = [
		...tabWiseQuery,
		...sessionTypeQuery,
		...queryFilters,
		orderBy('new_message_sent_at', 'desc'),
	];

	return firestoreQuery;
}

export default getFireStoreQuery;
