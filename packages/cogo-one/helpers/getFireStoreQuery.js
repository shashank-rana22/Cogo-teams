import {
	query,
	orderBy,
	where,
} from 'firebase/firestore';

import global from '../constants/IDS_CONSTANTS';

function getFireStoreQuery({ omniChannelCollection, userRoleIds, userId, appliedFilters }) {
	let firestoreQuery;
	let queryFilters = [];

	Object.keys(appliedFilters).forEach((item) => {
		if (item === 'tags') {
			queryFilters = [...queryFilters, where('chat_tags', 'array-contains', appliedFilters[item])];
		} else if (item === 'channels') {
			queryFilters = [...queryFilters, where('channel_type', 'in', appliedFilters[item])];
		}
	});

	if (
		userRoleIds.includes(global.TECH_SUPERADMIN_ID)
        || userRoleIds.includes(global.ADMIN_ID)
        || userRoleIds.includes(global.SUPERADMIN_ID)
        || userRoleIds.includes(global.TRADE_EXPERT_TEAM_LEAD_LONG_TAIL_ID)
	) {
		firestoreQuery = query(
			omniChannelCollection,
			...queryFilters,
			orderBy('updated_at', 'desc'),
			// where('session_type', '==', 'admin'),

		);
	} else {
		firestoreQuery = query(
			omniChannelCollection,
			...queryFilters,
			where('agent_id', '==', userId),
			// where('session_type', '==', 'admin'),
			orderBy('updated_at', 'desc'),

		);
	}
	return (
		firestoreQuery
	);
}

export default getFireStoreQuery;
