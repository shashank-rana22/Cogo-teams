import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { updateDoc, doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

function useAssignChat({
	closeModal = () => {},
	activeMessageCard = {},
	formattedData = {},
	setDisableButton = () => {},
	canMessageOnBotSession = false,
	firestore,
}) {
	const { profile = {} } = useSelector((state) => state);
	const { user_id, lead_user_id, organization_id, mobile_no, sender = null, cogo_entity_id } = formattedData || {};
	const { channel_type, id } = activeMessageCard || {};
	const [{ loading }, trigger] = useRequest({
		url    : '/assign_chat',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const roomRef = doc(
		firestore,
		`${FIRESTORE_PATH[channel_type]}/${id}`,
	);

	const addToGroup = async () => {
		const { requested_group_members = [], group_members = [] } = activeMessageCard || [];

		if (group_members.includes(profile.user.id)) {
			Toast.warn('You are alredy in group');
			return;
		}

		if (requested_group_members.includes(profile.user.id)) {
			Toast.warn('You have alredy sent request');
			return;
		}

		await updateDoc(roomRef, {
			requested_group_members: [...new Set([...requested_group_members, profile.user.id])],
		});
		Toast.success('Successfully Sent Request');
	};

	const updateRequestsOfRoom = async () => {
		await updateDoc(roomRef, {
			has_requested_by: {},
		});
		Toast.info('Request dissmissed');
	};

	const assignChat = async (payload, callbackFun = () => {}) => {
		try {
			await trigger({
				data: {
					channel                 : channel_type,
					channel_chat_id         : id,
					user_id                 : user_id || undefined,
					lead_user_id            : (!(user_id) && lead_user_id) ? lead_user_id : undefined,
					whatsapp_number_eformat : mobile_no,
					organization_id,
					sender,
					cogo_entity_id          : cogo_entity_id || undefined,
					...payload,

				},
			});
			callbackFun();

			if (!canMessageOnBotSession) {
				Toast.success('Successfully Assigned');
			}

			if (!canMessageOnBotSession) {
				closeModal();
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		} finally {
			setDisableButton('');
		}
	};

	return {
		assignChat,
		loading,
		updateRequestsOfRoom,
		addToGroup,
	};
}
export default useAssignChat;
