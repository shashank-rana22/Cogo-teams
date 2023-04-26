import { orderBy, where } from 'firebase/firestore';

function getFireStoreQuery({
	userId,
	appliedFilters,
	isomniChannelAdmin = false,
	showBotMessages = false,
}) {
	let queryFilters = [];
	let mainQuery = [];

	const isObserver = ['adminSession', 'botSession'].includes(appliedFilters?.observer) || false;

	if (isomniChannelAdmin) {
		mainQuery = [];
	} else {
		mainQuery = [
			!isObserver ? where('support_agent_id', '==', userId) : where('spectators_ids', 'array-contains', userId),
		];
	}

	const sessionTypeQuery = showBotMessages
		? where('session_type', '==', 'bot') : where('session_type', '==', 'admin');

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
				currentTime.setMinutes(currentTime.getMinutes() - 15);
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
				(item === 'observer' && appliedFilters[item] === 'chat_tags')
				|| 	(isomniChannelAdmin && item === 'chat_tags')
			)
			&& 	!showBotMessages
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

	const firestoreQuery = [...queryFilters, ...mainQuery, sessionTypeQuery, orderBy('new_message_sent_at', 'desc')];

	return firestoreQuery;
}

export default getFireStoreQuery;
