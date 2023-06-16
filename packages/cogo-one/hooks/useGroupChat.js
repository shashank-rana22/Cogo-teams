import { Toast } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { updateDoc, doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

function useGroupChat({
	activeMessageCard = {},
	firestore,
}) {
	const { profile = {} } = useSelector((state) => state);
	const { channel_type, id } = activeMessageCard || {};
	const MAX_GROUP_MEMBERS_ALLOWED = 3;

	const deleteGroupRequest = async (user_id) => {
		const roomRef = doc(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}`,
		);

		const { requested_group_members = [] } = activeMessageCard || [];

		await updateDoc(roomRef, {
			requested_group_members: requested_group_members.filter((x) => x !== user_id),
		});

		Toast.success('Request rejected.');
	};

	const approveGroupRequest = async (user_id) => {
		const roomRef = doc(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}`,
		);

		const { requested_group_members = [], group_members = [] } = activeMessageCard || [];

		if (group_members.length > MAX_GROUP_MEMBERS_ALLOWED) {
			Toast.warn('Request approved.');
			return;
		}

		await updateDoc(roomRef, {
			requested_group_members : requested_group_members.filter((x) => x !== user_id),
			group_members           : [...new Set([...group_members, profile.user.id])],
		});

		Toast.success('Request approved.');
	};

	const deleteGroupMember = async (user_id) => {
		const roomRef = doc(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}`,
		);

		const { group_members = [] } = activeMessageCard || [];

		await updateDoc(roomRef, {
			group_members: group_members.filter((x) => x !== user_id),
		});

		Toast.success('Group Member removed.');
	};

	return {
		deleteGroupRequest,
		approveGroupRequest,
		deleteGroupMember,
	};
}
export default useGroupChat;
