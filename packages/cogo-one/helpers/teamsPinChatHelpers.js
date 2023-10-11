import {
	doc,
	updateDoc,
} from 'firebase/firestore';

const togglePinChat = ({
	firestore = {},
	roomId = '',
	loggedInAgentId = '',
	type = '',
}) => {
	try {
		const roomDoc = doc(firestore, `users/${loggedInAgentId}/groups/${roomId}`);
		updateDoc(roomDoc, {
			is_pinned         : type === 'pin',
			message_pinned_at : Date.now(),
		});
	} catch (e) {
		console.error(e);
	}
};
export { togglePinChat };
