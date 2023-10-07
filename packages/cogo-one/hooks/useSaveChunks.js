import { addDoc, collection } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

function useSaveChunks() {
	const saveChunks = async ({
		firestore = {},
		roomId = '',
		messageId = '',
		channel_type = '',
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

	return { saveChunks };
}

export default useSaveChunks;
