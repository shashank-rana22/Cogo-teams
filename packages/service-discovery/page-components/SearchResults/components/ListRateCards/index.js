import React from 'react';

import useScrollDirection from '../../../../common/Header/useScrollDirection';
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
	trailer_freight: {
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
	refetchSearch = () => {},

}) {
	const { scrollDirection } = useScrollDirection();

	const PrimaryService = detail?.search_type;

	if (PrimaryService === undefined) {
		return null;
	}

	const { RateCard = FclCard } = RateCardMapping[PrimaryService] || {};

	return (
		<div className={styles.container}>
			<div className={styles.header} style={{ top: scrollDirection === 'up' ? 110 : 80 }}>
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
					refetchSearch={refetchSearch}
				/>
			))}
		</div>
	);
}

export default ListRateCards;
