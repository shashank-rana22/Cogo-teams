import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect } from 'react';

import FclCard from '../FclCard';

import styles from './styles.module.css';

function CogoAssuredCard({
	cogoAssuredRates = [],
	detail = {},
	setScreen = () => {},
	setComparisonRates = () => {},
	comparisonRates = {},
	refetchSearch = () => {},
	infoBanner = {},
	setInfoBanner = () => {},
	isGuideViewed = false,
	setRouterLoading = () => {},
	isMobile = false,
}) {
	const [selectedCard, setSelectedCard] = useState(cogoAssuredRates?.[GLOBAL_CONSTANTS.zeroth_index]?.id);

	const cardData = (cogoAssuredRates || []).find((item) => item.id === selectedCard);

	useEffect(() => {
		setSelectedCard(cogoAssuredRates?.[GLOBAL_CONSTANTS.zeroth_index]?.id);
	}, [cogoAssuredRates]);

	return (
		<div className={styles.container}>
			<FclCard
				rateCardData={cardData || {}}
				detail={detail}
				setScreen={setScreen}
				setComparisonRates={setComparisonRates}
				comparisonRates={comparisonRates}
				refetchSearch={refetchSearch}
				infoBanner={infoBanner}
				setInfoBanner={setInfoBanner}
				onChange={setSelectedCard}
				selectedCogoAssuredCard={selectedCard}
				showGuide={!isGuideViewed}
				cogoAssuredRates={cogoAssuredRates}
				setRouterLoading={setRouterLoading}
				isMobile={isMobile}
			/>
		</div>
	);
}

export default CogoAssuredCard;
