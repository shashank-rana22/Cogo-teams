import { orderBy, where } from 'firebase/firestore';

const BULK_ASSIGN_SEEN_MINUTES = 15;

const HIDE_MAIN_QUERY_FOR_SUB_TABS = ['groups', 'contacts'];

const getMainQuery = ({ userId, type, isObserver }) => {
	const VIEW_MAPPING = {
		admin_view    : [],
		shipment_view : [where('booking_agent_ids', 'array-contains', userId)],
	};

	const defaultFilter = [
		isObserver
			? where('spectators_ids', 'array-contains', userId)
			: where('support_agent_id', '==', userId),
	];

	return VIEW_MAPPING?.[type] || defaultFilter;
};

const getSessionQuery = ({ viewType, showBotMessages, tab }) => {
	if (viewType === 'shipment_view' || tab === 'contacts') {
		return where('session_type', 'in', ['bot', 'admin']);
	}
	return showBotMessages
		? where('session_type', '==', 'bot') : where('session_type', '==', 'admin');
};

const getTabQuery = ({ tab, userId }) => {
	const TABS_QUERY_MAPPING = {
		groups   : [where('group_members', 'array-contains', userId)],
		contacts : [where('user_details.account_type', '==', 'service_provider')],
	};

	return TABS_QUERY_MAPPING?.[tab] || [];
};

function getFireStoreQuery({
	userId,
	appliedFilters,
	isomniChannelAdmin = false,
	showBotMessages = false,
	viewType,
	activeSubTab,
}) {
	let queryFilters = [];

	const isObserver = ['adminSession', 'botSession'].includes(appliedFilters?.observer) || false;

	const mainQuery = HIDE_MAIN_QUERY_FOR_SUB_TABS.includes(activeSubTab)
		? [] : getMainQuery({ userId, type: viewType, isObserver });

	const sessionTypeQuery = getSessionQuery({ viewType, showBotMessages, tab: activeSubTab });

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
			} else if (appliedFilters[item] === 'seen_by_user') {
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
				!showBotMessages ? where('support_agent_id', '==', filterId)
					: where('spectators_ids', 'array-contains', filterId),
			];
		} else if (
			(
				(item === 'observer' && !showBotMessages && appliedFilters[item] === 'chat_tags')
				|| 	(isomniChannelAdmin && item === 'chat_tags')
			)

		) {
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
		}
	});

	const tabQuery = getTabQuery({ tab: activeSubTab, userId });

	const firestoreQuery = [
		...queryFilters,
		...mainQuery,
		sessionTypeQuery,
		...tabQuery,
		orderBy('new_message_sent_at', 'desc'),
	];

	return firestoreQuery;
}

export default getFireStoreQuery;
