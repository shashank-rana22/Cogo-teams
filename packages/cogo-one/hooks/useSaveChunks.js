import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

function useSaveChunks({ firestore = {}, channel_type = '' }) {
	const deleteChunks = async ({
		roomId = '',
		messageId = '',
		chunkIds = [],
		messageType = '',
	}) => {
		await Promise.all(chunkIds?.map(
			(chunkId) => {
				const activeMessageCollection = doc(
					firestore,
					`${FIRESTORE_PATH[channel_type]}/${roomId}/messages/${messageId}/${messageType}/${chunkId}`,
				);
				return deleteDoc(
					activeMessageCollection,
				);
			},
		));
	};

	const saveChunks = async ({
		roomId = '',
		messageId = '',
		messageChunks = [],
		messageType = '',
	}) => {
		const activeMessageCollection = collection(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${roomId}/messages/${messageId}/${messageType}`,
		);

		await Promise.all(messageChunks?.map(
			(itm, index) => addDoc(
				activeMessageCollection,
				{
					content    : itm,
					created_at : Date.now(),
					serial_id  : index,
				},

			),
		));
	};

	return { saveChunks, deleteChunks };
}

export default useSaveChunks;
