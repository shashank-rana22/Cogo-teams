import { cl, Textarea, RTE } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef, useEffect } from 'react';

import { TOOLBARCONFIG } from '../../../../../../constants';
import useSendChat from '../../../../../../hooks/useSendChat';
import useSendOmnichannelMail from '../../../../../../hooks/useSendOmnichannelMail';
import { formatFileAttributes } from '../../../../../../utils/getFileAttributes';
import styles from '../styles.module.css';

import FooterHead from './FooterHead';
import SendActions from './SendActions';

const getPlaceHolder = ({ hasPermissionToEdit, canMessageOnBotSession }) => {
	if (canMessageOnBotSession) {
		return 'This chat is currently in bot session, send a message to talk with customer';
	}
	if (hasPermissionToEdit) {
		return 'Type your message...';
	}
	return 'You do not have permission to chat';
};

const setEmailStateFunc = ({ mailActions, email = '' }) => {
	const { data, actionType = '' } = mailActions || {};

	const { response } = data || {};

	const { sender = '', subject = '' } = response || {};
	const toEmail = sender || email;

	if (actionType === 'reply') {
		return {
			toUserEmail: toEmail ? [sender] : [],
			subject,
		};
	}
	return {
		toUserEmail: [],
		subject,
	};
};

function Footer({
	canMessageOnBotSession = false,
	hasPermissionToEdit = false,
	suggestions = [],
	scrollToBottom = () => {},
	formattedData = {},
	viewType = '',
	firestore = {},
	activeChatCollection = {},
	setOpenModal = () => {},
	sendCommunicationTemplate = () => {},
	communicationLoading = false,
	assignChat = () => {},
	assignLoading = false,
	mailActions = {},
	setMailActions = () => {},
}) {
	const uploaderRef = useRef(null);

	const { id = '', channel_type = '', email = '' } = formattedData;

	const [draftMessages, setDraftMessages] = useState({});
	const [draftUploadedFiles, setDraftUploadedFiles] = useState({});
	const [uploading, setUploading] = useState({});
	const [emailState, setEmailState] = useState(() => setEmailStateFunc({ mailActions }));
	const [showControl, setShowControl] = useState('');
	const [errorValue, setErrorValue] = useState('');

	const uploadedFiles = draftUploadedFiles?.[id];
	const draftMessage = draftMessages?.[id];

	const fileMetaData = formatFileAttributes({ uploadedFiles: draftUploadedFiles?.[id] });

	const hasUploadedFiles = !isEmpty(draftUploadedFiles?.[id]);

	const resetEmailStates = () => {
		setDraftMessages((prev) => ({ ...prev, [id]: '' }));
		setDraftUploadedFiles((prev) => ({ ...prev, [id]: undefined }));
		setEmailState({
			toUserEmail   : [email],
			subject       : '',
			ccrecipients  : [],
			bccrecipients : [],
		});
		uploaderRef?.current?.externalHandleDelete?.();
		setMailActions({ actionType: '', data: {} });
	};

	const {
		sendChatMessage,
		sendQuickSuggestions,
		messageLoading,
	} = useSendChat({
		firestore,
		channelType  : channel_type,
		id,
		draftMessages,
		setDraftMessages,
		activeChatCollection,
		uploadedFile : fileMetaData?.[GLOBAL_CONSTANTS.zeroth_index] || {},
		setDraftUploadedFiles,
		formattedData,
		assignChat,
		canMessageOnBotSession,
		scrollToBottom,
		hasUploadedFiles,
	});

	const {
		mailLoading = false,
		sendMail = () => {},
	} = useSendOmnichannelMail({
		scrollToBottom,
		formattedData,
		emailState,
		draftUploadedFiles,
		draftMessage,
		uploadedFiles,
		setDraftMessages,
		setDraftUploadedFiles,
		mailActions,
		id,
		resetEmailStates,
	});

	const SEND_FUNC_MAPPING = {
		whatsapp: {
			function           : sendChatMessage,
			sendMessageLoading : messageLoading,
			sendOnEnter        : true,
		},
		email: {
			function           : sendMail,
			sendMessageLoading : mailLoading,
			sendOnEnter        : false,
		},
		default: {
			function           : sendChatMessage,
			sendMessageLoading : messageLoading,
			sendOnEnter        : true,
		},
	};

	const {
		function: sendMessage = () => {},
		sendMessageLoading,
		sendOnEnter,
	} = SEND_FUNC_MAPPING[channel_type] || SEND_FUNC_MAPPING.default;

	const handleKeyPress = (event) => {
		if (sendOnEnter && event.key === 'Enter' && !event.shiftKey && hasPermissionToEdit) {
			event.preventDefault();
			sendMessage();
		}
	};

	const handleProgress = (val) => {
		setUploading((prev) => ({ ...prev, [id]: val }));
	};

	const openInstantMessages = () => {
		setOpenModal({
			type : 'instant_messages',
			data : {
				updateMessage: (val) => {
					setDraftMessages((prev) => ({ ...prev, [id]: val }));
					setOpenModal({ type: null, data: {} });
				},
				sendCommunicationTemplate,
				communicationLoading,
				channel_type,
			},
		});
	};

	const isEmail = channel_type === 'email';

	const TEXTBOX_COMPONENT_MAPPING = {
		email    : RTE,
		whatsapp : Textarea,
		default  : Textarea,
	};

	const TextAreaComponent = TEXTBOX_COMPONENT_MAPPING[channel_type] || TEXTBOX_COMPONENT_MAPPING.default;

	useEffect(() => {
		setEmailState(setEmailStateFunc({ mailActions, email }));
	}, [mailActions, email]);

	return (
		<>
			{hasPermissionToEdit && (
				<FooterHead
					isEmail={isEmail}
					mailActions={mailActions}
					setErrorValue={setErrorValue}
					emailState={emailState}
					setShowControl={setShowControl}
					showControl={showControl}
					setEmailState={setEmailState}
					errorValue={errorValue}
					uploading={uploading}
					id={id}
					fileMetaData={fileMetaData}
					setDraftUploadedFiles={setDraftUploadedFiles}
					hasUploadedFiles={hasUploadedFiles}
					uploaderRef={uploaderRef}
					hasPermissionToEdit={hasPermissionToEdit}
					key={mailActions?.actionType}
					setMailActions={setMailActions}
				/>
			)}
			<div
				className={cl`${styles.text_area_div} ${
					hasPermissionToEdit ? '' : styles.opacity
				}`}
			>
				{!isEmail && !isEmpty(suggestions) && (
					<div className={styles.suggestions_div}>
						<div className={styles.flex}>
							<div className={styles.suggestions_text}>
								Suggestions:
							</div>
							{(suggestions || []).map((eachSuggestion) => (
								<div
									key={eachSuggestion}
									className={styles.tag_div}
									role="presentation"
									onClick={() => {
										if (hasPermissionToEdit && !sendMessageLoading) {
											sendQuickSuggestions({ val: eachSuggestion });
										}
									}}
									style={{
										cursor:
										(!hasPermissionToEdit || sendMessageLoading) ? 'not-allowed' : 'pointer',
									}}
								>
									{eachSuggestion}
								</div>
							))}
						</div>
					</div>
				)}
				<TextAreaComponent
					rows={5}
					placeholder={getPlaceHolder({ hasPermissionToEdit, canMessageOnBotSession })}
					className={styles.text_area}
					value={draftMessage || ''}
					onChange={(e) => setDraftMessages((p) => ({ ...p, [id]: e }))}
					disabled={!hasPermissionToEdit}
					style={{ cursor: !hasPermissionToEdit ? 'not-allowed' : 'text' }}
					onKeyDown={handleKeyPress}
					toolbarConfig={TOOLBARCONFIG}
					showToolbar={false}
				/>
				<div className={styles.flex_space_between}>
					<SendActions
						hasPermissionToEdit={hasPermissionToEdit}
						openInstantMessages={openInstantMessages}
						sendMessage={sendMessage}
						messageLoading={((canMessageOnBotSession && assignLoading) || sendMessageLoading)}
						scrollToBottom={scrollToBottom}
						draftMessage={draftMessage}
						formattedData={formattedData}
						viewType={viewType}
						uploading={uploading}
						id={id}
						handleProgress={handleProgress}
						setDraftUploadedFiles={setDraftUploadedFiles}
						setDraftMessages={setDraftMessages}
						hasUploadedFiles={hasUploadedFiles}
						draftUploadedFiles={draftUploadedFiles}
						ref={uploaderRef}
						emailState={emailState}
						isEmail={isEmail}
					/>
				</div>
			</div>
		</>
	);
}

export default Footer;
