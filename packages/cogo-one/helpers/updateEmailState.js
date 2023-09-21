import { getDoc, doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import getActiveCardDetails from '../utils/getActiveCardDetails';

const updateEmailState = async ({ roomId = '', messageId = '', firestore = {}, setEmailState = () => {} }) => {
	try {
		const roomDocData = await getDoc(doc(
			firestore,
			`${FIRESTORE_PATH.email}/${roomId}`,
		));

		const formattedData = getActiveCardDetails({ id: roomDocData?.id, ...(roomDocData?.data() || {}) });

		const messageDocData = await getDoc(doc(
			firestore,
			`${FIRESTORE_PATH.email}/${roomId}/messages/${messageId}`,
		));

		const draftMessageData = {
			id: messageDocData?.id,
			...(messageDocData?.data() || {}),
		};

		setEmailState((prev) => ({
			...prev,
			formattedData,
			draftMessageData,
		}));
	} catch (e) {
		console.error('e', e);
	}
};
export default updateEmailState;
