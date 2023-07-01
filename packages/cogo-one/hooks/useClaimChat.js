import { Toast } from '@cogoport/components';
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
	getDoc,
} from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const updateClaimKey = async ({ id, channel_type, firestore, value }) => {
	const userDocument = doc(
		firestore,
		`${FIRESTORE_PATH[channel_type]}/${id}`,
	);
	const userDocData = await getDoc(userDocument);
	const { session_type = '' } = userDocData.data() || {};
	if (session_type === 'bot') {
		await updateDoc(userDocument, { can_claim_chat: value });
	}
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
			setShowCarousel('in_timeout');
			await updateClaimKey({ id, channel_type, firestore, value: false });
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
			const timeoutValue = await getTimeoutConstant(firestore);
			setTimeout(() => {
				toggleCarouselState({ firestore, setShowCarousel });
			}, (timeoutValue || 10000));
		} catch (error) {
			Toast.error('something went wrong');
			await updateClaimKey({ id, channel_type, firestore, value: true });
			toggleCarouselState({ firestore, setShowCarousel });
		}
	};
	return {
		claimChat,
		claimLoading: loading,
	};
}
export default useClaimChat;
