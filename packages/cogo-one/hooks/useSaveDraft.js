import { useSelector } from '@cogoport/store';
import { merge } from '@cogoport/utils';
import { addDoc, updateDoc, doc, collection } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import updateEmailState from '../helpers/updateEmailState';

const INCREASE_MESSAGE_COUNT_BY_ONE = 1;

const formatMailDraftMessage = ({
	communication_id,
	payload,
	buttonType,
	parentEmailMessage,
	roomId,
	body,
}) => ({
	agent_type           : 'bot',
	conversation_type    : 'received',
	last_draft_saved_on  : Date.now(),
	updated_at           : Date.now(),
	message_type         : 'text',
	is_draft             : true,
	communication_id     : communication_id || '',
	room_id              : roomId,
	draft_type           : buttonType,
	parent_email_message : parentEmailMessage || {},
	response             : {
		attachments       : payload?.attachments || [],
		bcc_mails         : payload?.bccrecipients || [],
		body              : payload?.content || '',
		cc_mails          : payload?.ccrecipients || [],
		message_id        : payload?.msgId || '',
		sender            : payload?.sender || '',
		subject           : payload?.subject || '',
		to_mails          : payload?.toUserEmail || [],
		draft_type        : buttonType,
		draftQuillMessage : body,
	},
});

const createDraftRoom = async ({
	agentId = '',
	firestore = {},
	communication_id = '',
	rteEditorPayload = {},
	buttonType = '',
	body = '',
}) => {
	const emailCollection = collection(
		firestore,
		`${FIRESTORE_PATH.email}`,
	);

	const newDraftRoomPayload = {
		agent_type          : 'bot',
		channel_type        : 'email',
		created_at          : Date.now(),
		show_in_drafts      : true,
		session_type        : 'admin',
		new_message_sent_at : Date.now(),
		updated_at          : Date.now(),
		no_of_drafts        : 1,
		support_agent_id    : agentId,
		last_draft_document : formatMailDraftMessage({
			communication_id,
			buttonType,
			payload : rteEditorPayload,
			roomId  : '',
			body,
		}),
	};

	const res = await addDoc(emailCollection, newDraftRoomPayload);

	return res?.id;
};

const updateMessage = async ({
	roomId = '',
	payload = {},
	communication_id = '',
	buttonType = '',
	parent_email_message,
	firestore = {},
	channel_type = '',
	messageId = '',
	no_of_drafts = 0,
	is_draft = false,
	isNewRoomCreated = false,
	setEmailState = () => {},
	isMinimize = false,
	body = '',
}) => {
	const updatePayload = formatMailDraftMessage({
		communication_id,
		payload,
		buttonType,
		parentEmailMessage: parent_email_message,
		roomId,
		body,
	});

	if (!isNewRoomCreated) {
		const updateRoomPayload = {
			show_in_drafts      : true,
			new_message_sent_at : Date.now(),
			no_of_drafts        : no_of_drafts + INCREASE_MESSAGE_COUNT_BY_ONE,
			last_draft_document : updatePayload,
			updated_at          : Date.now(),
			session_type        : 'admin',
		};

		const roomDoc = doc(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${roomId}`,
		);

		await updateDoc(roomDoc, updateRoomPayload);
	}

	if (!is_draft) {
		const activeChatCollection = collection(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${roomId}/messages`,
		);

		const res = await addDoc(
			activeChatCollection,
			merge(
				updatePayload,
				{
					created_at: Date.now(),
				},
			),
		);
		if (isMinimize) {
			await updateEmailState({ roomId, messageId: res?.id, firestore, setEmailState });
		}

		return { roomId, messageId: res?.id };
	}

	const messageDoc = doc(
		firestore,
		`${FIRESTORE_PATH[channel_type]}/${roomId}/messages/${messageId}`,
	);

	await updateDoc(
		messageDoc,
		updatePayload,
	);

	if (isMinimize) {
		await updateEmailState({
			roomId,
			messageId,
			firestore,
			setEmailState,
		});
	}

	return { roomId, messageId };
};

const useSaveDraft = ({
	roomData = {},
	draftMessageData = {},
	buttonType = '',
	firestore = {},
	rteEditorPayload = {},
	parentMessageData = {},
	setEmailState = () => {},
	body = '',
}) => {
	const agentId = useSelector((state) => state.profile?.user?.id);

	const saveDraft = async ({
		communication_id = '',
		newComposeRoomId = '',
		newComposeDraftMsgId = '',
		isMinimize = false,
	} = {}) => {
		const { id: roomId, no_of_drafts = 0 } = roomData || {};

		const { is_draft = false, id = '' } = draftMessageData || {};

		let roomIdNew = newComposeRoomId || roomId;

		if (!roomIdNew) {
			roomIdNew = await createDraftRoom({
				agentId,
				firestore,
				communication_id,
				rteEditorPayload,
				buttonType,
				body,
			});
		}

		return updateMessage({
			roomId               : roomIdNew,
			payload              : rteEditorPayload,
			communication_id,
			buttonType,
			parent_email_message : parentMessageData,
			firestore,
			channel_type         : 'email',
			messageId            : newComposeDraftMsgId || id,
			no_of_drafts,
			is_draft             : newComposeDraftMsgId ? true : is_draft,
			draftMessageData,
			isNewRoomCreated     : !roomId,
			setEmailState,
			isMinimize,
			body,
		});
	};

	return {
		saveDraft,
	};
};
export default useSaveDraft;
