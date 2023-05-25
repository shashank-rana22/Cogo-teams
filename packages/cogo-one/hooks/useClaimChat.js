import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import {
	updateDoc,
	doc,
	collectionGroup,
	query,
	where,
	orderBy,
	getDocs,
	collection,
	limit,
} from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const updateClaimKey = async ({ id, channel_type, firestore, value }) => {
	const userDocument = doc(
		firestore,
		`${FIRESTORE_PATH[channel_type]}/${id}`,
	);
	await updateDoc(userDocument, { can_claim_chat: value });
};

const toggleCarouselState = async ({ firestore, setShowCarousel }) => {
	const omniChannelCollection = collectionGroup(firestore, 'rooms');
	const newChatsQuery = query(
		omniChannelCollection,
		where('session_type', '==', 'bot'),
		where('can_claim_chat', '==', true),
		orderBy('updated_at', 'desc'),
	);
	const getFlashMessages = await getDocs(newChatsQuery);
	setShowCarousel(!!getFlashMessages?.size);
};

const getTimeoutConstant = async (firestore) => {
	const constantCollection = collection(firestore, FIRESTORE_PATH.cogoone_constants);

	const constantsQuery = query(constantCollection, limit(1));
	const cogoOneConstants = await getDocs(constantsQuery);

	const cogoOneConstantsDocs = cogoOneConstants?.docs?.[0];
	const { flash_messages_timeout = 0 } = cogoOneConstantsDocs.data() || {};

	return flash_messages_timeout;
};

function useClaimChat({ userId, setShowCarousel, firestore }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/assign_chat',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const claimChat = async (payload) => {
		const { user_id, lead_user_id, organization_id, mobile_no, sender = null, channel_type, id } = payload || {};
		try {
			await trigger({
				data: {
					channel                 : channel_type,
					channel_chat_id         : id,
					user_id,
					lead_user_id,
					whatsapp_number_eformat : mobile_no,
					organization_id,
					sender,
					agent_id                : userId,
					is_chat_claimed         : true,
				},
			});
			Toast.success('Claim successful! The chat has been assigned to you.');
			setShowCarousel(false);
			await updateClaimKey({ id, channel_type, firestore, value: false });
			const timeoutValue = await getTimeoutConstant(firestore);
			setTimeout(() => {
				toggleCarouselState({ firestore, setShowCarousel });
			}, (timeoutValue || 10000));
		} catch (error) {
			Toast.error('something went wrong.');
			toggleCarouselState({ firestore, setShowCarousel });
		}
	};
	return {
		claimChat,
		claimLoading: loading,
	};
}
export default useClaimChat;
