import { throttle } from '@cogoport/utils';
import {
	collectionGroup,
	where,
	query,
	limit, orderBy, getCountFromServer,
} from 'firebase/firestore';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

const UNREAD_COUNT_PAGE_LIMIT = 100;

function getCountHelper({
	viewType = '',
	firestore = {},
	userSharedMails = [],
	agentId = '',
	isBotSession = false,
	setUnReadMailsCount = () => {},
}) {
	const getBaseQuery = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.all_chats_base_query;
	const getSessionQuery = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.session_type_query;

	const commonQuery = [
		collectionGroup(firestore, 'rooms'), where('has_admin_unread_messages', '==', true),
		...(getBaseQuery?.({ agentId, userSharedMails }) || []),
		...(getSessionQuery?.({
			sessionType: isBotSession ? 'bot' : 'admin',
		}) || []),
		where('channel_type', 'in', ['email']),
		orderBy('new_message_sent_at', 'desc'),
	];

	const snapshotQuery = query(...commonQuery, limit(1));
	const aggregateQuery = query(...commonQuery, limit(UNREAD_COUNT_PAGE_LIMIT));

	const throttledGetCount = throttle(async () => {
		const unreadChats = await getCountFromServer(aggregateQuery);
		const unreadCount = unreadChats?.data()?.count || 0;

		setUnReadMailsCount(unreadCount);
	}, 600);

	return { throttledGetCount, snapshotQuery };
}

export default getCountHelper;
