import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect } from 'react';

import RateCard from '../RateCard';

import styles from './styles.module.css';

function CogoAssuredCard({
	cogoAssuredRates = [],
	detail = {},
	setScreen = () => {},
	setComparisonRates = () => {},
	comparisonRates = {},
	refetch = () => {},
	infoBanner = {},
	setInfoBanner = () => {},
	isGuideViewed = false,
}) {
	const [selectedCard, setSelectedCard] = useState(cogoAssuredRates?.[GLOBAL_CONSTANTS.zeroth_index]?.id);

	const cardData = (cogoAssuredRates || []).find((item) => item.id === selectedCard);

	useEffect(() => {
		setSelectedCard(cogoAssuredRates?.[GLOBAL_CONSTANTS.zeroth_index]?.id);
	}, [cogoAssuredRates]);

	return (
		<div className={styles.container}>
			<RateCard
				rateCardData={cardData || {}}
				detail={detail}
				setScreen={setScreen}
				setComparisonRates={setComparisonRates}
				comparisonRates={comparisonRates}
				refetch={refetch}
				infoBanner={infoBanner}
				setInfoBanner={setInfoBanner}
				onChange={setSelectedCard}
				selectedCogoAssuredCard={selectedCard}
				showGuide={!isGuideViewed}
				cogoAssuredRates={cogoAssuredRates}
			/>
		</div>
	);
}

export default CogoAssuredCard;
