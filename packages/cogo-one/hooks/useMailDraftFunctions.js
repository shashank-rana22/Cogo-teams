import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { addDoc, updateDoc, doc, collection, getDoc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const INCREASE_MESSAGE_COUNT_BY_ONE = 1;

const formatMailDraftMessage = ({
	communication_id,
	payload,
	buttonType,
	parentEmailMessage,
}) => ({
	agent_type        : 'bot',
	conversation_type : 'received',
	created_at        : Date.now(),
	message_type      : 'text',
	is_draft          : true,
	communication_id  : communication_id || '',
	response          : {
		attachments          : payload?.attachments || [],
		bcc_mails            : payload?.bccrecipients || [],
		body                 : payload?.content || '',
		cc_mails             : payload?.ccrecipients || [],
		message_id           : payload?.msgId || '',
		sender               : payload?.sender || '',
		subject              : payload?.subject || '',
		to_mails             : payload?.toUserEmail || [],
		parent_email_message : parentEmailMessage || {},
		draft_type           : buttonType,
	},
});

function useMailDraftFunctions({
	firestore = {},
	formattedData = {},
	parentEmailMessage = {},
}) {
	const { id = '', no_of_drafts = 0 } = formattedData || {};
	const { id: messageDocumentId = '', response = {} } = parentEmailMessage || {};
	const { parent_email_message = {}, draft_type = '' } = response || {};

	const saveToExistingThread = async ({
		payload = {},
		communication_id = '',
		buttonType = '',
	}) => {
		let messageFireBaseDoc;
		let activeChatCollection;

		if (id) {
			messageFireBaseDoc = doc(
				firestore,
				`${FIRESTORE_PATH.email}/${id}`,
			);

			activeChatCollection = collection(
				firestore,
				`${FIRESTORE_PATH.email}/${id}/messages`,
			);
		}

		if (isEmpty(activeChatCollection) && isEmpty(messageFireBaseDoc)) {
			Toast.error('Something Went Wrong');
			return;
		}

		const res = await addDoc(
			activeChatCollection,
			formatMailDraftMessage({
				communication_id,
				payload,
				buttonType,
				parentEmailMessage,
			}),
		);

		let lastDraftDoc;

		if (res?.id) {
			lastDraftDoc = await getDoc(doc(
				firestore,
				`${FIRESTORE_PATH.email}/${id}/messages/${res.id}`,
			));
		}

		updateDoc(messageFireBaseDoc, {
			show_in_drafts      : true,
			new_message_sent_at : Date.now(),
			no_of_drafts        : no_of_drafts + INCREASE_MESSAGE_COUNT_BY_ONE,
			last_draft_document : lastDraftDoc?.data() || {},
		});
	};

	const updateTheExistingDraft = async ({
		communication_id,
		payload,
	}) => {
		const activeDraftMailCollection = doc(
			firestore,
			`${FIRESTORE_PATH.email}/${id}/messages/${messageDocumentId}`,
		);

		const messageFireBaseDoc = doc(
			firestore,
			`${FIRESTORE_PATH.email}/${id}`,
		);

		if (isEmpty(activeDraftMailCollection) || isEmpty(messageFireBaseDoc)) {
			return;
		}

		await updateDoc(
			activeDraftMailCollection,
			formatMailDraftMessage({
				communication_id,
				payload,
				parentEmailMessage : parent_email_message,
				buttonType         : draft_type,
			}),
		);

		const lastDraftDoc = await getDoc(doc(
			firestore,
			`${FIRESTORE_PATH.email}/${id}/messages/${messageDocumentId}`,
		));

		updateDoc(messageFireBaseDoc, {
			new_message_sent_at : Date.now(),
			last_draft_document : lastDraftDoc?.data() || {},
		});
	};

	const createNewRoomAndAddDraft = () => {

	};

	return {
		saveToExistingThread,
		updateTheExistingDraft,
		createNewRoomAndAddDraft,
	};
}

export default useMailDraftFunctions;
