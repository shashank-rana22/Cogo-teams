import { Toast } from '@cogoport/components';
import { updateDoc, doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

export function getHasAccessToEditGroup({ formattedMessageData, agentId, viewType }) {
	const {
		session_type,
		account_type,
		group_members,
		support_agent_id,
		managers_ids = [],
	} = formattedMessageData || {};

	return (
		VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.has_group_access
		&& (session_type === 'admin' && account_type === 'service_provider')
		&& (
			VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.has_permission_to_edit
			|| group_members?.includes(agentId)
			|| managers_ids?.includes(agentId)
			|| support_agent_id === agentId
		)
	);
}

export const switchUserChats = async ({ val, firestore, setActiveTab }) => {
	const { channel_type, id } = val || {};

	if (!(channel_type && id)) {
		return;
	}

	try {
		const messageDoc = doc(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}`,
		);

		await updateDoc(
			messageDoc,
			{
				new_message_count         : 0,
				has_admin_unread_messages : false,
			},
		);
		setActiveTab((prev) => ({ ...prev, data: val }));
	} catch (e) {
		Toast.error('Chat Not Found');
	}
};

export const updateLeaduser = ({ data = {}, activeCardData, firestore }) => {
	const { channel_type, id } = activeCardData || {};

	const roomCollection = doc(
		firestore,
		`${FIRESTORE_PATH[channel_type]}/${id}`,
	);

	try {
		updateDoc(roomCollection, {
			updated_at: Date.now(),
			...data,
		});
	} catch (error) {
		console.error(error);
	}
};
