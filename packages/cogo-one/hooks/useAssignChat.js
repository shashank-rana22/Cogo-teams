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
		try {
			console.log('addToGroup');
			const roomRef = doc(
				firestore,
				`${FIRESTORE_PATH[channel_type]}/${id}`,
			);
			console.log('roomRef', roomRef);
			const { group_members = [] } = activeMessageCard || [];
			console.log('group_members', group_members);

			await updateDoc(roomRef, {
				// group_members: [...new Set([...group_members, profile.id])],
				group_members: [1],

			});
		} catch (err) {
			console.warn(err);
		}
		console.log('updated Doc');
		return null;
	};

	const assignChat = async (payload, callbackFun = () => {}) => {
		try {
			console.log('payload.assignType', payload);
			if (payload.assignType === 'add_to_group') {
				console.log('addToGroupssss');
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
			}
			// if (!canMessageOnBotSession) {
			closeModal();
			Toast.success('Successfully Assigned');
			// }
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
