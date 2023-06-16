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

	const addToGroup = async () => {
		const roomRef = doc(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}`,
		);

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

	const assignChat = async (payload, callbackFun = () => {}) => {
		try {
			if (payload.assignType === 'add_to_group') {
				await addToGroup();
			} else {
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
	};
}
export default useAssignChat;
