import {
	where, query, getDocs, collectionGroup,
} from 'firebase/firestore';

const DEFAULT_ASSINED_CHAT_COUNT = 0;

export const getAssignedChats = async ({ userId, firestore }) => {
	const assignedChatsQuery = query(
		collectionGroup(firestore, 'rooms'),
		where('session_type', '==', 'admin'),
		where('support_agent_id', '==', userId),
	);

	const getAssignedChatsQuery = await getDocs(assignedChatsQuery);

	return getAssignedChatsQuery.size || DEFAULT_ASSINED_CHAT_COUNT;
};
