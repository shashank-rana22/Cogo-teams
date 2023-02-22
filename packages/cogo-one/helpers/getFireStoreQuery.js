import {
	query,
	orderBy,
	where,
} from 'firebase/firestore';

function getFireStoreQuery({ omniChannelCollection, userId, appliedFilters, isomniChannelAdmin = false }) {
	let firestoreQuery;
	let queryFilters = [];

	Object.keys(appliedFilters).forEach((item) => {
		if (item === 'tags') {
			queryFilters = [...queryFilters, where('chat_tags', 'array-contains', appliedFilters[item])];
		} else if (item === 'channels') {
			queryFilters = [...queryFilters, where('channel_type', 'in', appliedFilters[item])];
		} else if (item === 'status' && appliedFilters[item] === 'unread') {
			queryFilters = [...queryFilters, where('new_message_count', '>', 0), orderBy('new_message_count', 'desc')];
		} else if (item === 'escalation') {
			queryFilters = [...queryFilters, where('chat_status', '==', appliedFilters[item])];
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
			where('spectators_ids', 'array_contains', userId),
			where('session_type', '==', 'admin'),
			orderBy('new_message_sent_at', 'desc'),
		);
	}

	return (
		firestoreQuery
	);
}

export default getFireStoreQuery;
