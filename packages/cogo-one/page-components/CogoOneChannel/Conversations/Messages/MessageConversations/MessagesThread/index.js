import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import ReceiveDiv from '../../../../../../common/ReceiveDiv';
import SentDiv from '../../../../../../common/SentDiv';
import NewUserOutBound from '../NewUserOutBound';
import TimeLine from '../TimeLine';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

const CONVERSATION_TYPE_MAPPING = {
	sent     : ReceiveDiv,
	received : SentDiv,
	default  : TimeLine,
};

function MessagesThread({
	loadingPrevMessages = false,
	lastPage = false,
	getNextData = () => {},
	messagesData = [],
	activeMessageCard = () => {},
	formattedData = {},
	setRaiseTicketModal = () => {},
	hasNoFireBaseRoom = false,
	setModalType = () => {},
	activeTab = {},
	viewType = '',
}) {
	const { channel_type = '', new_user_message_count = 0, user_name = '' } = activeMessageCard;
	const unreadIndex = new_user_message_count > messagesData.length
		? DEFAULT_VALUE : messagesData.length - new_user_message_count;

	if (hasNoFireBaseRoom) {
		return (
			<NewUserOutBound setModalType={setModalType} activeTab={activeTab} />
		);
	}

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
			{(messagesData || []).map((eachMessage, index) => {
				const Component = CONVERSATION_TYPE_MAPPING[eachMessage?.conversation_type]
                 || CONVERSATION_TYPE_MAPPING.default;

				return (
					<Component
						key={eachMessage?.created_at}
						conversation_type={eachMessage?.conversation_type || 'unknown'}
						eachMessage={eachMessage}
						activeMessageCard={activeMessageCard}
						messageStatus={channel_type === 'platform_chat' && !(index >= unreadIndex)}
						user_name={user_name}
						setRaiseTicketModal={setRaiseTicketModal}
						formattedData={formattedData}
						viewType={viewType}
					/>
				);
			})}

		</>
	);
}

export default MessagesThread;
