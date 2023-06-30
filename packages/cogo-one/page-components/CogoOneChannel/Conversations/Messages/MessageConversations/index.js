import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useRef, useEffect } from 'react';

import getFileAttributes from '../../../../../utils/getFileAttributes';

import ConversationMessages from './ConversationMessages';
import Footer from './Footer';
import styles from './styles.module.css';

const SET_TIME_OUT = 200;
const DEFAULT_VALUE = 0;
const DISTANCE_FROM_TOP = 0;
const LAST_VALUE = 1;

function MessageConversations({
	messagesData = [],
	draftMessage = '',
	setDraftMessages = () => {},
	sendChatMessage,
	draftUploadedFile : finalUrl = '',
	setDraftUploadedFiles = () => {},
	getNextData,
	setOpenModal,
	activeMessageCard,
	suggestions = [],
	uploading,
	setUploading,
	hasPermissionToEdit = false,
	firstLoadingMessages,
	loadingPrevMessages,
	sentQuickSuggestions = () => {},
	sendCommunicationTemplate = () => {},
	communicationLoading = false,
	lastPage = false,
	messageLoading = false,
	formattedData = {},
	setRaiseTicketModal = () => {},
	canMessageOnBotSession,
}) {
	const messageRef = useRef();
	const { id = '', channel_type = '' } = activeMessageCard;

	const urlArray = decodeURI(finalUrl)?.split('/');
	const fileName = urlArray[(urlArray?.length || DEFAULT_VALUE) - LAST_VALUE] || '';

	const { uploadedFileName, fileIcon } = getFileAttributes({ finalUrl, fileName });

	const scrollToBottom = () => {
		setTimeout(() => {
			messageRef.current?.scrollTo({
				top   	  : messageRef.current.scrollHeight,
				behavior : 'smooth',
			});
		}, SET_TIME_OUT);
	};

	const handleProgress = (val) => {
		setUploading((prev) => ({ ...prev, [id]: val }));
	};

	const handleScroll = (e) => {
		const bottom = e.target.scrollTop === DISTANCE_FROM_TOP;
		if (bottom && !lastPage && !loadingPrevMessages) {
			getNextData();
		}
	};

	const openInstantMessages = () => {
		setOpenModal({
			type : 'instant_messages',
			data : {
				updateMessage: (val) => {
					setDraftMessages((p) => ({ ...p, [id]: val }));
					setOpenModal({ type: null, data: {} });
				},
				sendCommunicationTemplate,
				communicationLoading,
				channel_type,
			},
		});
	};

	const chatViewConditon = () => {
		if (
			((finalUrl) || uploading?.[id])
			&& !isEmpty(suggestions)
		) {
			return 'file_present_suggestions';
		}
		if ((finalUrl) || uploading?.[id]) {
			return 'file_present_nosuggestions';
		}
		if (!isEmpty(suggestions)) {
			return 'suggestions_exist';
		}
		return 'no_suggestions';
	};

	useEffect(() => {
		scrollToBottom();
	}, [firstLoadingMessages, id]);

	return (
		<div className={styles.styled_div}>
			<div
				key={id}
				className={cl`${styles.container} ${styles[chatViewConditon()]}`}
				onScroll={handleScroll}
				ref={messageRef}
			>
				{firstLoadingMessages ? (
					<div className={styles.flex_div}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.cogo_one_loader}
							type="video/gif"
							alt="loading"
							width={80}
							height={80}
						/>
					</div>
				) : (
					<ConversationMessages
						getNextData={getNextData}
						lastPage={lastPage}
						loadingPrevMessages={loadingPrevMessages}
						messagesData={messagesData}
						activeMessageCard={activeMessageCard}
						formattedData={formattedData}
						setRaiseTicketModal={setRaiseTicketModal}
					/>
				) }
			</div>

			<Footer
				draftMessage={draftMessage}
				sentQuickSuggestions={sentQuickSuggestions}
				messageLoading={messageLoading}
				canMessageOnBotSession={canMessageOnBotSession}
				handleProgress={handleProgress}
				openInstantMessages={openInstantMessages}
				hasPermissionToEdit={hasPermissionToEdit}
				suggestions={suggestions}
				scrollToBottom={scrollToBottom}
				setDraftMessages={setDraftMessages}
				id={id}
				sendChatMessage={sendChatMessage}
				setDraftUploadedFiles={setDraftUploadedFiles}
				uploading={uploading}
				uploadedFileName={uploadedFileName}
				fileIcon={fileIcon}
				finalUrl={finalUrl}
				formattedData={formattedData}
			/>
		</div>
	);
}

export default MessageConversations;
