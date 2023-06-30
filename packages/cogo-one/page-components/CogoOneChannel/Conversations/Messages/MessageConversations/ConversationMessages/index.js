import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import ReceiveDiv from '../../../../../../common/ReceiveDiv';
import SentDiv from '../../../../../../common/SentDiv';
import TimeLine from '../TimeLine';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

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

function ConversationMessages({
	loadingPrevMessages = false,
	lastPage, getNextData, messagesData = [], activeMessageCard,
	formattedData = {}, setRaiseTicketModal = () => {},
}) {
	const { channel_type = '', new_user_message_count = 0, user_name = '' } = activeMessageCard;
	const unreadIndex = new_user_message_count > messagesData.length
		? DEFAULT_VALUE : messagesData.length - new_user_message_count;

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

	return (
		<>
			{loadingPrevMessages
				? (
					<div className={styles.loader}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.spinner_loader}
							alt="load"
							width={20}
							height={20}
						/>
					</div>
				)
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
}

export default ConversationMessages;
