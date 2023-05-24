import { Carousel } from '@cogoport/components';

import useClaimChat from '../../../../../hooks/useClaimChat';

import getCarouselData from './getCarouselData';
import styles from './styles.module.css';

function FlashUserChats({
	flashMessagesList,
	activeCardId,
	userId,
	setActiveMessage,
	firestore,
	flashMessagesLoading,
	showCarousel,
	setShowCarousel,
}) {
	const { claimChat, claimLoading = false } = useClaimChat({ userId, setShowCarousel, firestore });

	const carouselData = showCarousel ? getCarouselData({
		flashMessagesList,
		activeCardId,
		userId,
		setActiveMessage,
		firestore,
		claimChat,
		claimLoading,
	}) : [];

	return (
		<div className={styles.flash_messages_div} style={{ '--height': !showCarousel ? '0' : '16%' }}>
			{!flashMessagesLoading && showCarousel && (
				<Carousel
					id="flash_messages"
					size="sm"
					key={carouselData}
					slides={carouselData}
					className={styles.carousel_styled}
					autoScroll={!claimLoading}
					showArrow={!claimLoading}
					showDots={false}
					itemsToScroll={1}
					itemsToShow={1}
					isInfinite
					timeInterval={50000}
				/>
			)}
		</div>
	);
}

export default FlashUserChats;
