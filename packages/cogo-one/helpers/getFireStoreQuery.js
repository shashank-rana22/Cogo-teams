import { orderBy, where } from 'firebase/firestore';

function getFireStoreQuery({
	userId,
	appliedFilters,
	isomniChannelAdmin = false,
	showBotMessages = false,
}) {
	let queryFilters = [];
	let mainQuery = [];

	if (isomniChannelAdmin) {
		mainQuery = [];
	} else {
		mainQuery = [
			where('support_agent_id', '==', userId),
		];
	}

	const sessionTypeQuery = showBotMessages
		? where('session_type', '==', 'bot') : where('session_type', '==', 'admin');

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
				where('support_agent_id', '==', filterId),
			];
		} else if (item === 'observer' && appliedFilters?.observer) {
			queryFilters = [
				...queryFilters,
				where('spectators_ids', 'array-contains', userId),
			];
		}
	});

	// if (isomniChannelAdmin) {
	// 	firestoreQuery = [
	// 		...queryFilters,
	// 		where('session_type', '==', 'admin'),
	// 		orderBy('new_message_sent_at', 'desc'),
	// 	];
	// } else {
	// 	const extraFilters = (appliedFilters?.observer?.[0] !== 'observer' && !showBotMessages)
	// 		? [where('support_agent_id', '==', userId)] : [];

	// 	firestoreQuery = [
	// 		...queryFilters,
	// 		where('session_type', '==', 'admin'),
	// 		...extraFilters,
	// 		where('spectators_ids', 'array-contains', userId),
	// 		orderBy('new_message_sent_at', 'desc'),
	// 	];
	// }
	const firestoreQuery = [...queryFilters, ...mainQuery, sessionTypeQuery, orderBy('new_message_sent_at', 'desc')];

	return firestoreQuery;
}

export default getFireStoreQuery;
