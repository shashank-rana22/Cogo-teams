import { cl, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef, useEffect } from 'react';

// import RTE_TOOL_BAR_CONFIG from '../../../../../../constants/rteToolBarConfig';
import useSendChat from '../../../../../../hooks/useSendChat';
import { formatFileAttributes } from '../../../../../../utils/getFileAttributes';

import { getPlaceHolder } from './footerFunctions';
import FooterHead from './FooterHead';
import SendActions from './SendActions';
import styles from './styles.module.css';

// const TEXTBOX_COMPONENT_MAPPING = {
// 	whatsapp : Textarea,
// 	default  : Textarea,
// };

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
	isMobile = false,
}) {
	const uploaderRef = useRef(null);

	const { id = '', channel_type = '' } = formattedData;

	const [draftMessages, setDraftMessages] = useState({});
	const [draftUploadedFiles, setDraftUploadedFiles] = useState({});
	const [uploading, setUploading] = useState({});
	const [showControl, setShowControl] = useState('');
	const [errorValue, setErrorValue] = useState('');

	const draftMessage = draftMessages?.[id];

	const fileMetaData = formatFileAttributes({ uploadedFiles: draftUploadedFiles?.[id] });

	const hasUploadedFiles = !isEmpty(draftUploadedFiles?.[id]);

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

	const SEND_FUNC_MAPPING = {
		whatsapp: {
			function           : sendChatMessage,
			sendMessageLoading : messageLoading,
			sendOnEnter        : true,
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

	// const TextAreaComponent = TEXTBOX_COMPONENT_MAPPING[channel_type] || TEXTBOX_COMPONENT_MAPPING.default;

	useEffect(() => {
		setDraftMessages((prev) => ({ ...prev, [id]: '' }));
		setDraftUploadedFiles((prev) => ({ ...prev, [id]: '' }));

		uploaderRef?.current?.externalHandleDelete?.('');
	}, [id]);

	return (
		<>
			{hasPermissionToEdit && (
				<FooterHead
					setErrorValue={setErrorValue}
					setShowControl={setShowControl}
					showControl={showControl}
					errorValue={errorValue}
					uploading={uploading}
					roomId={id}
					fileMetaData={fileMetaData}
					setDraftUploadedFiles={setDraftUploadedFiles}
					hasUploadedFiles={hasUploadedFiles}
					uploaderRef={uploaderRef}
					hasPermissionToEdit={hasPermissionToEdit}
				/>
			)}
			<div
				className={cl`${styles.text_area_div} ${
					hasPermissionToEdit ? '' : styles.opacity
				}`}
			>
				{(!isEmpty(suggestions) && !isMobile) ? (
					<div className={styles.suggestions_div}>
						<div className={styles.flex_container}>
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
				) : null}
				<Textarea
					rows={5}
					placeholder={getPlaceHolder({ hasPermissionToEdit, canMessageOnBotSession })}
					className={styles.text_area}
					value={draftMessage || ''}
					onChange={(val) => setDraftMessages((prev) => ({ ...prev, [id]: val }))}
					disabled={!hasPermissionToEdit}
					style={{ cursor: hasPermissionToEdit ? 'text' : 'not-allowed' }}
					onKeyDown={handleKeyPress}
					// modules={{ toolbar: RTE_TOOL_BAR_CONFIG }}
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
						roomId={id}
						handleProgress={handleProgress}
						setDraftUploadedFiles={setDraftUploadedFiles}
						setDraftMessages={setDraftMessages}
						hasUploadedFiles={hasUploadedFiles}
						draftUploadedFiles={draftUploadedFiles}
						ref={uploaderRef}
						isMobile={isMobile}
					/>
				</div>
			</div>
		</>
	);
}

export default Footer;
