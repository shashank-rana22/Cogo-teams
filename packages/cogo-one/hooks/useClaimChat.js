import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
import getCommonAgentType from '../utils/getCommonAgentType';

const QUERY_LIMIT = 1;
const DEFAULT_TIMEOUT_VALUE = 600000;

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

const toggleCarouselState = async ({ firestore, setCarouselState }) => {
	const omniChannelCollection = collectionGroup(firestore, 'rooms');
	const newChatsQuery = query(
		omniChannelCollection,
		where('session_type', '==', 'bot'),
		where('can_claim_chat', '==', true),
		orderBy('updated_at', 'desc'),
	);
	const getFlashMessages = await getDocs(newChatsQuery);
	setCarouselState(getFlashMessages?.size ? 'show' : 'hide');
};

const getTimeoutConstant = async ({ firestore, viewType = '' }) => {
	const constantCollection = collection(firestore, FIRESTORE_PATH.cogoone_constants);

	const constantsQuery = query(constantCollection, limit(QUERY_LIMIT));
	const cogoOneConstants = await getDocs(constantsQuery);

	const cogoOneConstantsDocs = cogoOneConstants?.docs?.[GLOBAL_CONSTANTS.zeroth_index];

	const { flash_messages_timeout_mapping = {} } = cogoOneConstantsDocs?.data?.() || {};

	if (viewType === 'cogoone_admin') {
		return flash_messages_timeout_mapping.cogoone_admin;
	}

	const commonAgentType = getCommonAgentType({ viewType });

	return flash_messages_timeout_mapping[commonAgentType] || DEFAULT_TIMEOUT_VALUE;
};

const getPayload = ({ payload, userId }) => {
	const { user_id, lead_user_id, organization_id, mobile_no, sender = null, channel_type, id } = payload || {};
	return {
		channel                 : channel_type,
		channel_chat_id         : id,
		user_id,
		lead_user_id,
		whatsapp_number_eformat : mobile_no,
		organization_id,
		sender,
		agent_id                : userId,
		is_chat_claimed         : true,
	};
};

function useClaimChat({ userId, setCarouselState, firestore, viewType = '' }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/assign_chat',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const claimChat = async (payload) => {
		const { channel_type, id } = payload || {};
		try {
			setCarouselState('in_timeout');

			await updateClaimKey({ id, channel_type, firestore, value: false });
			await trigger({
				data: getPayload({ payload, userId }),
			});

			Toast.success('Claim successful! The chat has been assigned to you.');
			const timeoutValue = await getTimeoutConstant({ firestore, viewType });

			setTimeout(() => {
				toggleCarouselState({ firestore, setCarouselState });
			}, (timeoutValue || DEFAULT_TIMEOUT_VALUE));
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'something went wrong');
			await updateClaimKey({ id, channel_type, firestore, value: true });
			toggleCarouselState({ firestore, setCarouselState });
		}
	};
	return {
		claimChat,
		claimLoading: loading,
	};
}
export default useClaimChat;
