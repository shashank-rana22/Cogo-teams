import { Loader } from '@cogoport/components';
import React from 'react';

import useScrollDirection from '../../../../common/Header/useScrollDirection';
import FclCard from '../RateCard/FclCard';

import ComparisonHeader from './ComparisonHeader';
import Header from './Header';
import Schedules from './Schedules';
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
	weekly_data = [],
	paginationProps = {},
	loading = false,
}) {
	const { scrollDirection } = useScrollDirection();

	const PrimaryService = detail?.search_type;

	if (PrimaryService === undefined) {
		return null;
	}

	const { RateCard = FclCard } = RateCardMapping[PrimaryService] || {};

	return (
		<div className={styles.container}>
			<div className={styles.header} style={{ top: scrollDirection === 'up' ? 115 : 80 }}>
				<Header
					details={detail}
					filters={filters}
					setFilters={setFilters}
					total_count={paginationProps?.total_count}
				/>

				{showComparison ? (
					<ComparisonHeader
						rateCardsForComparison={rateCardsForComparison}
						setScreen={setScreen}
					/>
				) : null}

			</div>

			<Schedules
				weekly_data={weekly_data}
				paginationProps={paginationProps}
				filters={filters}
				setFilters={setFilters}
			/>

			{loading ? (
				<div className={styles.loading}>
					<span className={styles.loading_text}>Looking for Rates</span>
					<Loader themeType="primary" className={styles.loader} background="#000" />
				</div>
			) : ((rates || []).map((rateCardData) => (
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
			)))}

		</div>
	);
}

export default ListRateCards;
