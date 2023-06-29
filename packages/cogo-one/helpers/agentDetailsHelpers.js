import { Toast } from '@cogoport/components';
import {
	updateDoc,
	doc,
} from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

export function getHasAccessToEditGroup({ sessionType, accountType, activeMessageCard, agentId, viewType }) {
	return (sessionType === 'admin' && accountType === 'service_provider')
	&& (activeMessageCard.group_members?.includes(agentId)
	|| activeMessageCard.support_agent_id === agentId || viewType === 'admin_view');
}

export const switchUserChats = async ({ val, firestore, setActiveTab }) => {
	const { channel_type, id } = val || {};
	if (channel_type && id) {
		try {
			const messageDoc = doc(
				firestore,
				`${FIRESTORE_PATH[channel_type]}/${id}`,
			);
			await updateDoc(messageDoc, { new_message_count: 0, has_admin_unread_messages: false });
			setActiveTab((p) => ({ ...p, data: val }));
		} catch (e) {
			Toast.error('Chat Not Found');
		}
	}
};

export const updateLeaduser = async ({ data = {}, activeCardData, firestore }) => {
	const { channel_type, id } = activeCardData || {};
	const roomCollection = doc(
		firestore,
		`${FIRESTORE_PATH[channel_type]}/${id}`,
	);

	try {
		await updateDoc(roomCollection, {
			updated_at: Date.now(),
			...data,
		});
	} catch (error) {
		console.error(error);
	}
};
