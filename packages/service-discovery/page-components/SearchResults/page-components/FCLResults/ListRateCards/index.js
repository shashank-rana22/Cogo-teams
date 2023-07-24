import { Loader, Pagination } from '@cogoport/components';
import React from 'react';

// import useScrollDirection from '../../../../../common/Header/useScrollDirection';
import FclCard from '../FclCard';

import ComparisonHeader from './ComparisonHeader';
import Header from './Header';
import Schedules from './Schedules';
import styles from './styles.module.css';

function HeaderTop({
	detail = {},
	filters = {},
	setFilters = () => {}, total_count = '', showComparison = false, rateCardsForComparison = [], setScreen = () => {},
}) {
	// const { scrollDirection } = useScrollDirection();

	return (
		<div className={styles.header}>
			<Header
				details={detail}
				filters={filters}
				setFilters={setFilters}
				total_count={total_count}
			/>

			{showComparison ? (
				<ComparisonHeader
					rateCardsForComparison={rateCardsForComparison}
					setScreen={setScreen}
				/>
			) : null}
		</div>
	);
}

function LoaderComponent() {
	return (
		<div className={styles.loading}>
			<span className={styles.loading_text}>Looking for Rates</span>
			<Loader themeType="primary" className={styles.loader} background="#000" />
		</div>
	);
}

function RateCard({
	rateCardData = {},
	loading = false,
	detail = {},
	setScreen = () => {}, setComparisonCheckbox = () => {}, comparisonCheckbox = '', refetchSearch = () => {},
}) {
	if (loading) {
		return null;
	}

	return (
		<FclCard
			key={rateCardData.id}
			rateCardData={rateCardData}
			detail={detail}
			setScreen={setScreen}
			setComparisonCheckbox={setComparisonCheckbox}
			comparisonCheckbox={comparisonCheckbox}
			refetchSearch={refetchSearch}
		/>
	);
}

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
	const PrimaryService = detail?.search_type;

	if (PrimaryService === undefined) {
		return null;
	}

	return (
		<div className={styles.container}>
			<HeaderTop
				detail={detail}
				filters={filters}
				setFilters={setFilters}
				total_count={paginationProps?.total_count}
				showComparison={showComparison}
				rateCardsForComparison={rateCardsForComparison}
				setScreen={setScreen}
			/>

			<Schedules
				paginationProps={paginationProps}
				filters={filters}
				setFilters={setFilters}
			/>

			{loading ? <LoaderComponent /> : null}

			{(rates || []).map((rateCardData) => (
				<RateCard
					key={rateCardData.id}
					loading={loading}
					rateCardData={rateCardData}
					detail={detail}
					setSelectedCard={setSelectedCard}
					setScreen={setScreen}
					setComparisonCheckbox={setComparisonCheckbox}
					comparisonCheckbox={comparisonCheckbox}
					refetchSearch={refetchSearch}
				/>
			))}

			{rates.length > 5 ? (
				<div className={styles.pagination}>
					<Pagination
						type="table"
						currentPage={filters.page}
						totalItems={paginationProps?.total_count}
						pageSize={paginationProps?.page_limit}
						onPageChange={(val) => setFilters((prev) => ({
							...prev,
							page: val,
						}))}
					/>
				</div>
			) : null}
		</div>
	);
}

export default ListRateCards;
