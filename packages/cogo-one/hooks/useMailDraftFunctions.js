import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { addDoc, updateDoc, doc, collection } from 'firebase/firestore';

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

	const saveToExistingThread = ({
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

		addDoc(
			activeChatCollection,
			formatMailDraftMessage({
				communication_id,
				payload,
				buttonType,
				parentEmailMessage,
			}),
		);

		updateDoc(messageFireBaseDoc, {
			show_in_drafts      : true,
			new_message_sent_at : Date.now(),
			no_of_drafts        : no_of_drafts + INCREASE_MESSAGE_COUNT_BY_ONE,
		});
	};

	const updateTheExistingDraft = ({
		communication_id,
		payload,
	}) => {
		const activeDraftMailCollection = doc(
			firestore,
			`${FIRESTORE_PATH.email}/${id}/messages/${messageDocumentId}`,
		);

		if (isEmpty(activeDraftMailCollection)) {
			return;
		}

		updateDoc(
			activeDraftMailCollection,
			formatMailDraftMessage({
				communication_id,
				payload,
				parentEmailMessage : parent_email_message,
				buttonType         : draft_type,
			}),
		);
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
