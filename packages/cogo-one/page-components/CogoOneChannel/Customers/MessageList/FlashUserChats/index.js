import { Carousel } from '@cogoport/components';

import MessageCardData from '../MessageCardData';

import styles from './styles.module.css';

const getCarouselData = ({
	flashMessagesList,
	activeCardId,
	userId,
	setActiveMessage,
	firestore,
}) => flashMessagesList.map(
	(eachRoom) => ({
		key    : eachRoom?.id,
		render : () => (
			<div className={styles.flash_message_wrapper}>
				<MessageCardData
					item={eachRoom}
					activeCardId={activeCardId}
					userId={userId}
					setActiveMessage={setActiveMessage}
					firestore={firestore}
					autoAssignChats
					showPin={false}
					source="flash_messages"
				/>
			</div>
		),
	}),
);

function FlashUserChats({
	flashMessagesList,
	activeCardId,
	userId,
	setActiveMessage,
	firestore,
	messagesLoading,
}) {
	const r = getCarouselData({
		flashMessagesList,
		activeCardId,
		userId,
		setActiveMessage,
		firestore,
	});

	return (
		<div className={styles.flash_messages_div}>
			{!messagesLoading && (
				<Carousel
					id="flash_messages"
					size="sm"
					slides={r}
					className={styles.carousel_styled}
					autoScroll
					showDots={false}
					itemsToScroll={1}
					itemsToShow={1}
					isInfinite
					timeInterval={3000}
				/>
			)}
		</div>
	);
}

export default FlashUserChats;
