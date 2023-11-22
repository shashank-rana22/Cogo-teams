import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { merge } from '@cogoport/utils';
import { addDoc, updateDoc, doc, collection } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import updateEmailState from '../helpers/updateEmailState';
import { splitStringIntoChunks } from '../utils/chunkUtils';

import useSaveChunks from './useSaveChunks';

const INCREASE_MESSAGE_COUNT_BY_ONE = 1;
const LIMIT_FOR_BODY_PREVIEW = 200;

const formatMailDraftMessage = ({
	communication_id = '',
	payload = {},
	buttonType = '',
	parentEmailMessage = {},
	roomId = '',
	emailState = {},
}) => {
	const updateParentMessage = {
		...parentEmailMessage,
		response: {
			...parentEmailMessage?.response,
			body: '',
		},
	};

	return {
		agent_type           : 'bot',
		conversation_type    : 'received',
		last_draft_saved_on  : Date.now(),
		updated_at           : Date.now(),
		message_type         : 'text',
		is_draft             : true,
		communication_id     : communication_id || '',
		room_id              : roomId,
		draft_type           : buttonType,
		parent_email_message : updateParentMessage || {},
		response             : {
			attachments  : payload?.attachments || [],
			bcc_mails    : payload?.bccrecipients || [],
			body         : '',
			body_preview : emailState?.rawRTEContent?.slice(
				GLOBAL_CONSTANTS.zeroth_index,
				LIMIT_FOR_BODY_PREVIEW,
			) || '',
			cc_mails       : payload?.ccrecipients || [],
			message_id     : payload?.msgId || '',
			sender         : payload?.sender || '',
			subject        : payload?.subject || '',
			to_mails       : payload?.toUserEmail || [],
			draft_type     : buttonType,
			user_ids       : emailState?.user_ids,
			mailView       : emailState?.mailView,
			custom_subject : emailState?.customSubject || '',
			orgData        : emailState?.orgData || {},
		},
	};
};

const createDraftRoom = async ({
	agentId = '',
	firestore = {},
	communication_id = '',
	rteEditorPayload = {},
	buttonType = '',
	emailState = {},
	agentName = '',
}) => {
	const emailCollection = collection(
		firestore,
		`${FIRESTORE_PATH.email}`,
	);

	const msgDocument = formatMailDraftMessage({
		communication_id,
		buttonType,
		payload   : rteEditorPayload,
		roomId    : '',
		emailState,
		roomLevel : true,
	});

	const newDraftRoomPayload = {
		agent_type            : 'bot',
		channel_type          : 'email',
		created_at            : Date.now(),
		show_in_drafts        : true,
		session_type          : 'admin',
		new_message_sent_at   : Date.now(),
		updated_at            : Date.now(),
		last_message_document : msgDocument,
		no_of_drafts          : 1,
		support_agent_id      : agentId,
		last_draft_document   : msgDocument,
		spectators_data       : [{
			agent_id   : agentId,
			agent_name : agentName,
		}],
	};

	let res = {};

	try {
		res = await addDoc(emailCollection, newDraftRoomPayload);
	} catch (e) {
		console.error(e);
	}

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
	setSendLoading = () => {},
	emailState = {},
	showOrgSpecificMail = false,
	saveChunks = () => {},
	deleteChunks = () => {},
}) => {
	const messageChunks = splitStringIntoChunks({ content: emailState?.body });
	const rteContentChunks = splitStringIntoChunks({ content: emailState?.rteContent });

	const updatePayload = formatMailDraftMessage({
		communication_id,
		payload,
		buttonType,
		parentEmailMessage: parent_email_message,
		roomId,
		emailState,
		showOrgSpecificMail,
	});

	if (!isNewRoomCreated) {
		const updateRoomPayload = {
			show_in_drafts        : true,
			new_message_sent_at   : Date.now(),
			no_of_drafts          : no_of_drafts + INCREASE_MESSAGE_COUNT_BY_ONE,
			last_draft_document   : updatePayload,
			last_message_document : updatePayload,
			updated_at            : Date.now(),
			session_type          : 'admin',
		};

		const roomDoc = doc(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${roomId}`,
		);

		try {
			await updateDoc(roomDoc, updateRoomPayload);
		} catch (err) {
			console.error(err);
		}
	}

	if (!is_draft) {
		const activeChatCollection = collection(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${roomId}/messages`,
		);
		let res = {};

		try {
			res = await addDoc(
				activeChatCollection,
				merge(
					updatePayload,
					{
						created_at: Date.now(),
					},
				),
			);

			await saveChunks({
				roomId,
				messageId   : res?.id,
				messageChunks,
				messageType : 'body',
			});

			await saveChunks({
				roomId,
				messageId     : res?.id,
				messageChunks : rteContentChunks,
				messageType   : 'rte_content',
			});

			if (isMinimize) {
				await updateEmailState({
					roomId,
					messageId: res?.id,
					firestore,
					setEmailState,
				});
			}
		} catch (err) {
			console.error(err);
		}

		setSendLoading(false);

		return { roomId, messageId: res?.id };
	}

	const messageDoc = doc(
		firestore,
		`${FIRESTORE_PATH[channel_type]}/${roomId}/messages/${messageId}`,
	);

	try {
		await updateDoc(
			messageDoc,
			updatePayload,
		);

		await deleteChunks({
			roomId,
			messageId,
			chunkIds    : emailState?.draftQuillBody?.body?.ids,
			messageType : 'body',
		});

		await deleteChunks({
			roomId,
			messageId,
			chunkIds    : emailState?.draftQuillBody?.rte_content?.ids,
			messageType : 'rte_content',
		});

		await saveChunks({
			roomId,
			messageId,
			messageChunks,
			messageType: 'body',
		});

		await saveChunks({
			roomId,
			messageId,
			messageChunks : rteContentChunks,
			messageType   : 'rte_content',
		});
	} catch (err) {
		console.error(err);
	}

	if (isMinimize) {
		await updateEmailState({
			roomId,
			messageId,
			firestore,
			setEmailState,
		});
	}

	setSendLoading(false);

	return { roomId, messageId };
};

const useSaveDraft = ({
	roomData = {},
	draftMessageData = {},
	buttonType = '',
	firestore = {},
	getRteEditorPayload = () => {},
	parentMessageData = {},
	setEmailState = () => {},
	setSendLoading = () => {},
	emailState = {},
	showOrgSpecificMail = false,
}) => {
	const {
		agentId = '',
		agentName = '',
	} = useSelector((state) => ({
		agentId   : state.profile?.user?.id,
		agentName : state.profile?.user?.name,
	}));

	const { saveChunks, deleteChunks } = useSaveChunks({
		firestore,
		channel_type: 'email',
	});

	const saveDraft = async ({
		communication_id = '',
		newComposeRoomId = '',
		newComposeDraftMsgId = '',
		isMinimize = false,
	} = {}) => {
		setSendLoading(true);

		const { id: roomId, no_of_drafts = 0 } = roomData || {};

		const { is_draft = false, id = '' } = draftMessageData || {};

		let roomIdNew = newComposeRoomId || roomId;

		const rteEditorPayload = await getRteEditorPayload();

		if (!roomIdNew) {
			roomIdNew = await createDraftRoom({
				agentId,
				firestore,
				communication_id,
				rteEditorPayload,
				buttonType,
				emailState,
				agentName,
			});
		}

		if (!roomIdNew) {
			setSendLoading(false);
			return null;
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
			setSendLoading,
			emailState,
			showOrgSpecificMail,
			saveChunks,
			deleteChunks,
		});
	};

	return {
		saveDraft,
	};
};

export default useSaveDraft;
