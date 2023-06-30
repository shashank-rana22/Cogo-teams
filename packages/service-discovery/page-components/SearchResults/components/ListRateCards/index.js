import React from 'react';

import FclCard from '../RateCard/FclCard';

import ComparisonHeader from './ComparisonHeader';
import styles from './styles.module.css';

const RateCardMapping = {
	fcl_freight: {
		RateCard: FclCard,
	},
	air_freight: {
		RateCard: FclCard,
	},
	others: {
		RateCard: FclCard,
	},
};

function ListRateCards({
	rates = [], detail = {},
	setSelectedCard = () => {},
	setScreen = () => {},
	setComparisonCheckbox = () => {},
	showComparison = false,
	rateCardsForComparison = [],
	comparisonCheckbox = {},
}) {
	const PrimaryService = detail?.search_type;

	if (PrimaryService === undefined) {
		return null;
	}

	const { RateCard } = RateCardMapping[PrimaryService];

	return (
		<div className={styles.container}>

			{showComparison ? (
				<ComparisonHeader
					rateCardsForComparison={rateCardsForComparison}
					setScreen={setScreen}
				/>
			) : null}

			{(rates || []).map((rateCardData) => (
				<RateCard
					key={rateCardData.id}
					rateCardData={rateCardData}
					detail={detail}
					setSelectedCard={setSelectedCard}
					setScreen={setScreen}
					setComparisonCheckbox={setComparisonCheckbox}
					comparisonCheckbox={comparisonCheckbox}
				/>
			))}
		</div>
	);
}

export default ListRateCards;
