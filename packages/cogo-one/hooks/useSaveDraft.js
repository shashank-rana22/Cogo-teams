import { useSelector } from '@cogoport/store';
import { merge } from '@cogoport/utils';
import { addDoc, updateDoc, doc, collection } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const INCREASE_MESSAGE_COUNT_BY_ONE = 1;

const formatMailDraftMessage = ({
	communication_id,
	payload,
	buttonType,
	parentEmailMessage,
	roomId,
}) => ({
	agent_type          : 'bot',
	conversation_type   : 'received',
	last_draft_saved_on : Date.now(),
	updated_at          : Date.now(),
	message_type        : 'text',
	is_draft            : true,
	communication_id    : communication_id || '',
	room_id             : roomId,
	draft_type          : buttonType,
	response            : {
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

const createDraftRoom = async ({
	agentId = '',
	firestore = {},
	communication_id = '',
	rteEditorPayload = {},
	buttonType = '',
}) => {
	const emailCollection = collection(
		firestore,
		`${FIRESTORE_PATH.email}`,
	);

	const newDraftRoomPayload = {
		agent_type          : 'bot',
		channel_type        : 'email',
		created_at          : Date.now(),
		show_in_draft       : true,
		new_message_sent_at : Date.now(),
		updated_at          : Date.now(),
		no_of_drafts        : 1,
		support_agent_id    : agentId,
		last_draft_document : formatMailDraftMessage({
			communication_id,
			buttonType,
			rteEditorPayload,
			roomId: '',
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
	draftMessageData = {},
	isNewRoomCreated = false,
}) => {
	const updatePayload = formatMailDraftMessage({
		communication_id,
		payload,
		buttonType,
		parentEmailMessage: parent_email_message,
		roomId,
	});

	if (!isNewRoomCreated) {
		const updateRoomPayload = {
			show_in_drafts      : true,
			new_message_sent_at : Date.now(),
			no_of_drafts        : no_of_drafts + INCREASE_MESSAGE_COUNT_BY_ONE,
			last_draft_document : updatePayload,
			updated_at          : Date.now(),
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

		await addDoc(
			activeChatCollection,
			merge(
				updatePayload,
				{
					created_at : Date.now(),
					response   : { parent_email_message: draftMessageData },
				},
			),
		);
		return;
	}

	const messageDoc = doc(
		firestore,
		`${FIRESTORE_PATH[channel_type]}/${roomId}/messages/${messageId}`,
	);

	await updateDoc(
		messageDoc,
		updatePayload,
	);
};

const useSaveDraft = ({ roomData, draftMessageData, buttonType, firestore, rteEditorPayload }) => {
	const agentId = useSelector((state) => state.profile?.user?.id);

	const saveDraft = async ({ communication_id } = {}) => {
		const { id: roomId, no_of_drafts = 0 } = roomData || {};

		const { is_draft = false, id = '', parent_email_message = {} } = draftMessageData || {};

		let roomIdNew = roomId;

		if (!roomId) {
			roomIdNew = await createDraftRoom({
				agentId,
				firestore,
				communication_id,
				rteEditorPayload,
				buttonType,
			});
		}

		await updateMessage({
			roomId           : roomIdNew,
			payload          : rteEditorPayload,
			communication_id,
			buttonType,
			parent_email_message,
			firestore,
			channel_type     : 'email',
			messageId        : id,
			no_of_drafts,
			is_draft,
			draftMessageData,
			isNewRoomCreated : !roomId,
		});
	};

	return {
		saveDraft,
	};
};
export default useSaveDraft;
