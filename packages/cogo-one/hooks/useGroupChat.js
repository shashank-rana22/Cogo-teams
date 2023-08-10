import { Toast } from '@cogoport/components';
import { updateDoc, doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

import useCreateCogooneTimeline from './useCreateCogooneTimeline';

const MAX_GROUP_MEMBERS_ALLOWED = 3;

function useGroupChat({
	activeMessageCard = {},
	firestore,
}) {
	const { channel_type, id, requested_group_members, group_members } = activeMessageCard || {};

	const { createCogooneTimeline } = useCreateCogooneTimeline();

	const roomRef = doc(
		firestore,
		`${FIRESTORE_PATH[channel_type]}/${id}`,
	);

	const deleteGroupRequest = async (userId) => {
		await updateDoc(roomRef, {
			requested_group_members: requested_group_members?.filter((x) => x !== userId),
		});
		Toast.success('Request rejected.');

		createCogooneTimeline({
			payload: {
				channel           : channel_type,
				channel_chat_id   : id,
				agent_id          : userId,
				conversation_type : 'rejected_from_group',
			},
		});
	};

	const approveGroupRequest = async (userId) => {
		if (group_members?.length > MAX_GROUP_MEMBERS_ALLOWED) {
			Toast.warn('Request cannot be approved.');
			return;
		}

		await updateDoc(roomRef, {
			requested_group_members : requested_group_members?.filter((x) => x !== userId),
			group_members           : [...new Set([...(group_members || []), userId])],
		});
		Toast.success('Request approved.');

		createCogooneTimeline({
			payload: {
				channel           : channel_type,
				channel_chat_id   : id,
				agent_id          : userId,
				conversation_type : 'added_to_group',
			},
		});
	};

	const deleteGroupMember = async (userId) => {
		await updateDoc(roomRef, {
			group_members: group_members?.filter((x) => x !== userId),
		});
		Toast.success('Group Member removed.');

		createCogooneTimeline({
			payload: {
				channel           : channel_type,
				channel_chat_id   : id,
				agent_id          : userId,
				conversation_type : 'leaving_the_group',
			},
		});
	};

	const addGroupMember = async (userId) => {
		if (group_members?.length > MAX_GROUP_MEMBERS_ALLOWED) {
			Toast.warn('Group member cannot be added.');
			return;
		}

		await updateDoc(roomRef, {
			group_members: [...new Set([...(group_members || []), userId])],
		});
		Toast.success('Group member added.');

		createCogooneTimeline({
			payload: {
				channel           : channel_type,
				channel_chat_id   : id,
				agent_id          : userId,
				conversation_type : 'added_to_group',
			},
		});
	};

	return {
		deleteGroupRequest,
		approveGroupRequest,
		deleteGroupMember,
		addGroupMember,
	};
}
export default useGroupChat;
