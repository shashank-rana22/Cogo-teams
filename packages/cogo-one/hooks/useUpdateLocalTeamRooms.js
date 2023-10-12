import { useSelector } from '@cogoport/store';
import { doc, updateDoc } from 'firebase/firestore';

function useUpdateLocalTeamRooms({ firestore = {} }) {
	const loggedInAgentId = useSelector(({ profile }) => profile.user.id);

	const readTeamsMessage = async ({ localRoomId = '' }) => {
		try {
			const roomDoc = doc(firestore, `/users/${loggedInAgentId}/groups/${localRoomId}`);

			updateDoc(roomDoc, {
				self_has_unread_messages   : false,
				self_unread_messages_count : 0,
				updated_at                 : Date.now(),
			});
		} catch (e) {
			console.error('e', e);
		}
	};

	return {
		readTeamsMessage,
	};
}

export default useUpdateLocalTeamRooms;
