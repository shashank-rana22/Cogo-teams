import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useEffect, useRef, useCallback } from 'react';

import useGetMessages from '../../../../../hooks/useGetMessages';

import ChatRequests from './ChatRequests';
import Footer from './Footer';
import MessagesThread from './MessagesThread';
import styles from './styles.module.css';

const DISTANCE_FROM_TOP = 10;
const TIMEOUT_FOR_SCROLL = 200;
const MIN_HEIGHT_FOR_API_CALL = 10;
const DISABLE_FOOTER_FOR = ['email'];
const LATEST_MESSAGES_AT_TOP_FOR = ['email'];

function MessageConversations({
	firestore = {},
	setOpenModal = () => {},
	activeMessageCard = {},
	suggestions = [],
	hasPermissionToEdit = false,
	sendCommunicationTemplate = () => {},
	communicationLoading = false,
	formattedData = {},
	setRaiseTicketModal = () => {},
	canMessageOnBotSession = false,
	viewType = '',
	hasNoFireBaseRoom = false,
	setModalType = () => {},
	activeTab = {},
	mailProps = {},
	activeChatCollection = {},
	newUserRoomLoading = false,
	assignLoading = false,
	assignChat = () => {},
	supportAgentId = '',
	userId = '',
	setActiveTab = () => {},
}) {
	const conversationsDivRef = useRef(null);

	const { id = '', channel_type = '' } = activeMessageCard || {};
	const { emailState = {}, setEmailState = () => {} } = mailProps || {};
	const { scrollToTop = false } = emailState || {};
	const latestMessagesAtTop = LATEST_MESSAGES_AT_TOP_FOR.includes(channel_type);

	const {
		getNextData = () => {}, lastPage, firstLoadingMessages,
		messagesData, loadingPrevMessages, deleteMessage,
	} = useGetMessages({
		activeChatCollection,
		id,
		viewType,
		hasNoFireBaseRoom,
		firestore,
		channel_type,
		setActiveTab,
	});

	const handleScroll = (e) => {
		const bottom = e.target.scrollTop <= DISTANCE_FROM_TOP;
		if (bottom && !lastPage && !loadingPrevMessages) {
			getNextData();
		}
	};

	const handleEmailScroll = (e) => {
		const { clientHeight, scrollTop, scrollHeight } = e.target;
		const reachBottom = scrollTop + clientHeight + MIN_HEIGHT_FOR_API_CALL >= scrollHeight;
		if (reachBottom && !lastPage && !loadingPrevMessages) {
			getNextData();
		}
	};

	const scrollToLastMessage = useCallback(() => {
		setTimeout(() => {
			conversationsDivRef.current?.scrollTo({
				top   	  : conversationsDivRef.current.scrollHeight,
				behavior : 'smooth',
			});
		}, TIMEOUT_FOR_SCROLL);
	}, []);

	const scrollToRecentMessage = useCallback(() => {
		setTimeout(() => {
			conversationsDivRef.current?.scrollTo({
				top   	  : 0,
				behavior : 'smooth',
			});
		}, TIMEOUT_FOR_SCROLL);
	}, []);

	useEffect(() => {
		if (scrollToTop) {
			scrollToRecentMessage();
			setEmailState((prev) => ({ ...prev, scrollToTop: false }));
		}
	}, [scrollToRecentMessage, scrollToTop, setEmailState]);

	useEffect(() => {
		if (!latestMessagesAtTop) {
			scrollToLastMessage();
		}
	}, [scrollToLastMessage, id, firstLoadingMessages, latestMessagesAtTop]);

	return (
		<div
			key={id}
			className={cl`${styles.container} ${channel_type === 'email' ? styles.mail_container : ''}`}
		>
			<ChatRequests
				firestore={firestore}
				activeMessageCard={activeMessageCard}
				formattedData={formattedData}
				userId={userId}
				viewType={viewType}
				supportAgentId={supportAgentId}
				assignLoading={assignLoading}
				assignChat={assignChat}
			/>
			<div
				className={styles.message_container}
				onScroll={latestMessagesAtTop
					? handleEmailScroll
					: handleScroll}
				ref={conversationsDivRef}
			>
				{(newUserRoomLoading || firstLoadingMessages) ? (
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
					<MessagesThread
						getNextData={getNextData}
						lastPage={lastPage}
						loadingPrevMessages={loadingPrevMessages}
						messagesData={messagesData}
						activeMessageCard={activeMessageCard}
						formattedData={formattedData}
						setRaiseTicketModal={setRaiseTicketModal}
						hasNoFireBaseRoom={hasNoFireBaseRoom}
						setModalType={setModalType}
						activeTab={activeTab}
						viewType={viewType}
						firestore={firestore}
						scrollToBottom={scrollToLastMessage}
						scrollToTop={scrollToTop}
						hasPermissionToEdit={hasPermissionToEdit}
						ref={conversationsDivRef}
						mailProps={mailProps}
						latestMessagesAtTop={latestMessagesAtTop}
						deleteMessage={deleteMessage}
						roomId={id}
					/>
				)}
			</div>
			<div className={styles.omni_channel_text_footer}>
				{DISABLE_FOOTER_FOR.includes(channel_type) ? null : (
					<Footer
						canMessageOnBotSession={canMessageOnBotSession}
						hasPermissionToEdit={hasPermissionToEdit}
						suggestions={suggestions}
						formattedData={formattedData}
						viewType={viewType}
						firestore={firestore}
						activeChatCollection={activeChatCollection}
						setOpenModal={setOpenModal}
						sendCommunicationTemplate={sendCommunicationTemplate}
						communicationLoading={communicationLoading}
						assignChat={assignChat}
						assignLoading={assignLoading}
						scrollToBottom={scrollToLastMessage}
					/>
				)}
			</div>
		</div>
	);
}

export default MessageConversations;
