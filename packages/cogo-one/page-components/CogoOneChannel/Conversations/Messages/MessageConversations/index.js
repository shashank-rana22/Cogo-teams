import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useEffect, forwardRef } from 'react';

import useGetMessages from '../../../../../hooks/useGetMessages';

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
				/>
			) }
		</div>
	);
}

export default forwardRef(MessageConversations);
