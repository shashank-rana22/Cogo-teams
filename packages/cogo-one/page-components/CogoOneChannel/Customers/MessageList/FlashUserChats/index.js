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
	showCarousel,
	setShowCarousel,
	canShowCarousel,
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
		<div className={styles.flash_messages_div} style={{ '--height': !canShowCarousel ? '0' : '16%' }}>
			{canShowCarousel && (
				<Carousel
					id="flash_messages"
					size="sm"
					key={carouselData}
					slides={carouselData}
					className={styles.carousel_styled}
					showArrow={!claimLoading}
					showDots={false}
					itemsToScroll={1}
					itemsToShow={1}
					isInfinite
				/>
			)}
		</div>
	);
}

export default FlashUserChats;
