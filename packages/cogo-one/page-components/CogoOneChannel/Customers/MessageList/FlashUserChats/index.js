import { Carousel } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

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
}) {
	const { claimChat, claimLoading = false } = useClaimChat({ userId });

	const carouselData = getCarouselData({
		flashMessagesList,
		activeCardId,
		userId,
		setActiveMessage,
		firestore,
		claimChat,
		claimLoading,
	});

	const isCarouselEmpty = isEmpty(carouselData);

	return (
		<div className={styles.flash_messages_div} style={{ '--height': isCarouselEmpty ? '0' : '16%' }}>
			{!flashMessagesLoading && !isCarouselEmpty && (
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
