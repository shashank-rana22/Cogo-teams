import {
	query, getDocs, collection, orderBy,
} from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { combineChunks } from '../utils/chunkUtils';

const MESSAGE_TYPES = ['rte_content', 'body'];

const getFirebaseDraftBody = async ({ messageRoomId = '', firestore = {}, roomId = '' }) => {
	const messagesData = await Promise.all(
		MESSAGE_TYPES.map(
			async (itm) => {
				const activeChatCollection = collection(
					firestore,
					`${FIRESTORE_PATH.email}/${roomId}/messages/${messageRoomId}/${itm}`,
				);

				const assignedChatsQuery = query(
					activeChatCollection,
					orderBy('serial_id', 'asc'),
				);

				const getAssignedChatsQuery = await getDocs(assignedChatsQuery);
				return {
					type : itm,
					data : getAssignedChatsQuery,
				};
			},
		),
	);

	let draftData = {};

	const newContent = messagesData?.reduce(
		(acc, item) => {
			const content = combineChunks({ chunks: item?.data });

			draftData = { ...draftData, [item?.type]: content };
			return `${acc}<br>${content.content}`;
		},
		'',
	);

	return { newContent, draftData };
};

export default getFirebaseDraftBody;
