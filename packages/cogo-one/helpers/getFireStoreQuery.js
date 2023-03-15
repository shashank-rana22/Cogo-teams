import { query, orderBy, where } from 'firebase/firestore';

function getFireStoreQuery({
	omniChannelCollection,
	userId,
	appliedFilters,
	isomniChannelAdmin = false,
	showBotMessages = false,
}) {
	let firestoreQuery;
	let queryFilters = [];
	if (showBotMessages) {
		if (isomniChannelAdmin) {
			return query(
				omniChannelCollection,
				where('session_type', '==', 'bot'),
				orderBy('new_message_sent_at', 'desc'),
			);
		}
		return query(
			omniChannelCollection,
			where('session_type', '==', 'bot'),
			where('spectators_ids', 'array-contains', userId),
			orderBy('new_message_sent_at', 'desc'),
		);
	}

	Object.keys(appliedFilters).forEach((item) => {
		if (item === 'tags') {
			queryFilters = [
				...queryFilters,
				where('chat_tags', 'array-contains', appliedFilters[item]),
			];
		} else if (item === 'channels') {
			queryFilters = [
				...queryFilters,
				where('channel_type', 'in', appliedFilters[item]),
			];
		} else if (item === 'status' && appliedFilters[item] === 'unread') {
			queryFilters = [
				...queryFilters,
				where('new_message_count', '>', 0),
				orderBy('new_message_count', 'desc'),
			];
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
				where('spectators_ids', 'array-contains', filterId),
			];
		} else if (item === 'assigned_to_me' && appliedFilters?.[item] === 'me' && !isomniChannelAdmin) {
			queryFilters = [
				...queryFilters,
				where('support_agent_id', '==', userId),
			];
		}
	});

	if (isomniChannelAdmin) {
		firestoreQuery = query(
			omniChannelCollection,
			...queryFilters,
			where('session_type', '==', 'admin'),
			orderBy('new_message_sent_at', 'desc'),
		);
	} else {
		firestoreQuery = query(
			omniChannelCollection,
			...queryFilters,
			where('session_type', '==', 'admin'),
			where('spectators_ids', 'array-contains', userId),
			orderBy('new_message_sent_at', 'desc'),
		);
	}

	return firestoreQuery;
}

export default getFireStoreQuery;
