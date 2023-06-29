import MessageCardData from '../MessageCardData';

import styles from './styles.module.css';

const getCarouselData = ({
	flashMessagesList = [],
	activeTab,
	userId,
	setActiveMessage,
	firestore,
	claimChat,
	claimLoading,
}) => (
	flashMessagesList.map(
		(eachRoom) => ({
			key    : eachRoom?.id,
			render : () => (
				<div className={styles.flash_message_wrapper}>
					<MessageCardData
						item={eachRoom}
						activeTab={activeTab}
						userId={userId}
						setActiveMessage={setActiveMessage}
						firestore={firestore}
						autoAssignChats
						claimChat={claimChat}
						claimLoading={claimLoading}
						source="flash_messages"
					/>
				</div>
			),
		}),
	)
);
export default getCarouselData;
