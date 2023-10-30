import {
	doc,
	updateDoc,
	deleteDoc,
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

function deleteDraftDoc({
	firestore = {},
	roomId = '',
	loggedInAgentId,
	clearActiveRoom = () => {},
}) {
	try {
		const roomDoc = doc(firestore, `users/${loggedInAgentId}/groups/${roomId}`);
		deleteDoc(roomDoc);
		clearActiveRoom();
	} catch (e) {
		console.error(e);
	}
}

export { togglePinChat, deleteDraftDoc };
