import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useRef, useEffect } from 'react';

import ReceiveDiv from '../../../../../common/ReceiveDiv';
import SentDiv from '../../../../../common/SentDiv';
import useGetEmojiList from '../../../../../hooks/useGetEmojis';
import getFileAttributes from '../../../../../utils/getFileAttributes';

import Footer from './Footer';
import styles from './styles.module.css';
import TimeLine from './TimeLine';

const SET_TIME_OUT = 200;
const DEFAULT_VALUE = 0;
const LAST_VALUE = -1;

function MessageMapping({ conversation_type, ...restProps }) {
	switch (conversation_type) {
		case 'sent':
			return <ReceiveDiv {...restProps} />;
		case 'received':
			return <SentDiv {...restProps} />;
		default:
			return <TimeLine {...restProps} />;
	}
}

const getPlaceHolder = (hasPermissionToEdit, canMessageOnBotSession) => {
	if (canMessageOnBotSession) {
		return 'This chat is currently in bot session, send a message to talk with customer';
	}
	if (hasPermissionToEdit) {
		return 'Type your message...';
	}
	return 'You do not have permission to chat';
};

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
	const { id = '', channel_type = '', new_user_message_count = 0, user_name = '' } = activeMessageCard;

	const {
		emojisList = {},
		setOnClicked = () => {},
		onClicked = false,
		emojiListFetch = () => {},
	} = useGetEmojiList({ activeMessageCard });

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
		const bottom = e.target.scrollTop === DEFAULT_VALUE;
		if (bottom && !lastPage && !loadingPrevMessages) {
			getNextData();
		}
	};

	const ticketPopoverContent = (data) => {
		const triggerModal = () => {
			setRaiseTicketModal((p) => {
				if (p?.state) {
					return { state: false, data: {}, source: null };
				}
				return { state: true, data: { messageData: data, formattedData }, source: 'message' };
			});
		};
		return (
			<div className={styles.raise_ticket} role="button" tabIndex={0} onClick={triggerModal}>
				Raise a ticket
			</div>
		);
	};

	useEffect(() => {
		if (id) {
			emojiListFetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [firstLoadingMessages, id]);

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

	const loader = (
		<div className={styles.loader}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.spinner_loader}
				alt="load"
				width={10}
				height={10}
			/>
		</div>
	);

	const firstLoadingDiv = (
		<div className={styles.flex_div}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.cogo_one_loader}
				type="video/gif"
				alt="loading"
				width={80}
				height={80}
			/>
		</div>
	);

	const unreadIndex = new_user_message_count > messagesData.length
		? DEFAULT_VALUE : messagesData.length - new_user_message_count;

	const messageConversation = (
		<>
			{loadingPrevMessages
				? loader
				: (
					<div className={styles.load_prev_messages}>
						{!lastPage && (
							<IcMRefresh
								className={styles.refresh_icon}
								onClick={getNextData}
							/>
						)}
					</div>
				)}
			{(messagesData || []).map((eachMessage, index) => (
				<MessageMapping
					key={eachMessage?.created_at}
					conversation_type={eachMessage?.conversation_type || 'unknown'}
					eachMessage={eachMessage}
					activeMessageCard={activeMessageCard}
					messageStatus={channel_type === 'platform_chat' && !(index >= unreadIndex)}
					ticketPopoverContent={ticketPopoverContent}
					user_name={user_name}
				/>
			))}

		</>
	);

	return (
		<div className={styles.styled_div}>
			<div
				key={id}
				className={cl`${styles.container} ${styles[chatViewConditon()]}`}
				onScroll={handleScroll}
				ref={messageRef}
			>
				{firstLoadingMessages ? firstLoadingDiv : messageConversation }
			</div>

			<Footer
				getPlaceHolder={getPlaceHolder}
				draftMessage={draftMessage}
				sentQuickSuggestions={sentQuickSuggestions}
				messageLoading={messageLoading}
				canMessageOnBotSession={canMessageOnBotSession}
				emojisList={emojisList}
				setOnClicked={setOnClicked}
				onClicked={onClicked}
				handleProgress={handleProgress}
				openInstantMessages={openInstantMessages}
				hasPermissionToEdit={hasPermissionToEdit}
				suggestions={suggestions}
				scrollToBottom={scrollToBottom}
				setDraftMessages={setDraftMessages}
				id={id}
				sendChatMessage={sendChatMessage}
				activeMessageCard={activeMessageCard}
				setDraftUploadedFiles={setDraftUploadedFiles}
				uploading={uploading}
				uploadedFileName={uploadedFileName}
				fileIcon={fileIcon}
				finalUrl={finalUrl}
			/>
		</div>
	);
}

export default MessageConversations;
