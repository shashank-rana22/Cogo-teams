import { Toast } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { updateDoc, doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

import useCreateCogooneTimeline from './useCreateCogooneTimeline';

const useTransferChat = ({ firestore, activeMessageCard }) => {
	const { profile = {} } = useSelector((state) => state);

	const { createCogooneTimeline } = useCreateCogooneTimeline();

	const {
		requested_group_members = [],
		group_members = [],
		support_agent_id,
		channel_type,
		id,
	} = activeMessageCard || {};

	const { user: { id: logginInAgentId } } = profile || {};

	const roomRef = doc(
		firestore,
		`${FIRESTORE_PATH[channel_type]}/${id}`,
	);

	const requestToJoinGroup = async () => {
		if (group_members.includes(logginInAgentId)) {
			Toast.warn('You are alredy in group');
			return;
		}

		if (requested_group_members.includes(logginInAgentId)) {
			Toast.warn('You have alredy sent request');
			return;
		}

		await updateDoc(roomRef, {
			requested_group_members: [...new Set([...requested_group_members, logginInAgentId])],
		});

		Toast.success('Successfully Sent Request');

		createCogooneTimeline({
			payload: {
				channel           : channel_type,
				channel_chat_id   : id,
				conversation_type : 'request_to_join_group',
			},
		});
	};

	const dissmissTransferRequest = async () => {
		await updateDoc(roomRef, {
			has_requested_by: {},
		});
		Toast.info('Request dissmissed');

		createCogooneTimeline({
			payload: {
				channel           : channel_type,
				channel_chat_id   : id,
				agent_id          : support_agent_id,
				conversation_type : 'request_dissmissed',
			},
		});
	};

	return {
		requestToJoinGroup,
		dissmissTransferRequest,
	};
};

export default useTransferChat;
