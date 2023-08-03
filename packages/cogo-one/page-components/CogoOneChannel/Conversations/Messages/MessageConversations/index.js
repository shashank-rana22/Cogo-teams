import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useEffect, useRef, useCallback } from 'react';

import useGetMessages from '../../../../../hooks/useGetMessages';

import Footer from './Footer';
import MessagesThread from './MessagesThread';
import styles from './styles.module.css';

const DISTANCE_FROM_TOP = 10;
const TIMEOUT_FOR_SCROLL = 200;

function MessageConversations({
	activeMessageCard = {},
	formattedData = {},
	setRaiseTicketModal = () => {},
	viewType = '',
	hasNoFireBaseRoom = false,
	setModalType = () => {},
	activeTab = {},
	activeChatCollection = {},
	newUserRoomLoading = false,
	setMailActions = () => {},
	mailActions = {},
	firestore = {},
	hasPermissionToEdit = false,
	actionType = '',
	canMessageOnBotSession = false,
	communicationLoading = false,
	assignLoading = false,
	suggestions = [],
	setOpenModal = () => {},
	assignChat = () => {},
	sendCommunicationTemplate = () => {},
	mailProps = {},
}) {
	const conversationsDivRef = useRef(null);

	const { id = '', channel_type = '' } = activeMessageCard || {};

	const {
		getNextData = () => {}, lastPage, firstLoadingMessages,
		messagesData, loadingPrevMessages,
	} = useGetMessages({ activeChatCollection, id, viewType, hasNoFireBaseRoom });

	const handleScroll = (e) => {
		const bottom = e.target.scrollTop <= DISTANCE_FROM_TOP;
		if (bottom && !lastPage && !loadingPrevMessages) {
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

	useEffect(() => {
		scrollToLastMessage();
	}, [scrollToLastMessage, id, firstLoadingMessages]);

	return (
		<div
			key={id}
			className={cl`${styles.container} ${channel_type === 'email' ? styles.mail_container : ''}`}
		>
			<div
				className={styles.message_container}
				onScroll={handleScroll}
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
						setMailActions={setMailActions}
						mailActions={mailActions}
						firestore={firestore}
						scrollToBottom={scrollToLastMessage}
						viewType={viewType}
						hasPermissionToEdit={hasPermissionToEdit}
						ref={conversationsDivRef}
						mailProps={mailProps}
					/>
				)}
			</div>
			<div className={styles.omni_channel_text_footer}>
				{(channel_type !== 'email' || actionType) && (
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
						mailActions={mailActions}
						setMailActions={setMailActions}
					/>
				)}
			</div>
		</div>
	);
}

export default MessageConversations;
