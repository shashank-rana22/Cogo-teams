import { Loader } from '@cogoport/components';
import React from 'react';

import useScrollDirection from '../../../../../common/Header/useScrollDirection';
import FclCard from '../FclCard';

import ComparisonHeader from './ComparisonHeader';
import Header from './Header';
import Schedules from './Schedules';
import styles from './styles.module.css';

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
	paginationProps = {},
	loading = false,
}) {
	const { scrollDirection } = useScrollDirection();

	const PrimaryService = detail?.search_type;

	if (PrimaryService === undefined) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header} style={{ top: scrollDirection === 'up' ? '115px' : '80px' }}>
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
				<FclCard
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
