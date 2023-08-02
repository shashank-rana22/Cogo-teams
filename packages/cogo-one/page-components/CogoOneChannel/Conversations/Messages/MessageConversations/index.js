import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useEffect, forwardRef } from 'react';

import useGetMessages from '../../../../../hooks/useGetMessages';

import Footer from './Footer';
import MessagesThread from './MessagesThread';
import styles from './styles.module.css';

const DISTANCE_FROM_TOP = 10;

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
	scrollToLastMessage = () => {},
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
}, ref) {
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

	useEffect(() => {
		scrollToLastMessage();
	}, [scrollToLastMessage, id, firstLoadingMessages]);

	return (
		<div
			key={id}
			className={cl`${styles.container} ${channel_type === 'email' ? styles.mail_container : ''}`}
			onScroll={handleScroll}
			ref={ref}
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
					ref={ref}
				/>
			) }
			<div className={styles.footer}>
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

export default forwardRef(MessageConversations);
