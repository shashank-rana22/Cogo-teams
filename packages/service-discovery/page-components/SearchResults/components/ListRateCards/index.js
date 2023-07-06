import React from 'react';

import FclCard from '../RateCard/FclCard';

import ComparisonHeader from './ComparisonHeader';
import Header from './Header';
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
	filters = {},
	setFilters = () => {},
}) {
	const PrimaryService = detail?.search_type;

	if (PrimaryService === undefined) {
		return null;
	}

	const { RateCard } = RateCardMapping[PrimaryService];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header
					ratesData={rates}
					details={detail}
					filters={filters}
					setFilters={setFilters}
				/>
				{showComparison ? (
					<ComparisonHeader
						rateCardsForComparison={rateCardsForComparison}
						setScreen={setScreen}
					/>
				) : null}
			</div>

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
