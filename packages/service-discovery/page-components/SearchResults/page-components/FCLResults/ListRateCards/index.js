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
	setFilters = () => {},
	total_rates_count = 0,
	comparisonRates = {},
	setComparisonRates = () => {},
	setScreen = () => {},
	refetch = () => {},
}) {
	// const { scrollDirection } = useScrollDirection();
	const showComparison = Object.keys(comparisonRates).length > 1;

	return (
		<div className={styles.header}>
			<Header
				details={detail}
				filters={filters}
				setFilters={setFilters}
				total_rates_count={total_rates_count}
				refetch={refetch}
			/>

			{showComparison ? (
				<ComparisonHeader
					comparisonRates={comparisonRates}
					setComparisonRates={setComparisonRates}
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
	setScreen = () => {},
	setComparisonRates = () => {},
	comparisonRates = {},
	refetchSearch = () => {},
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
			setComparisonRates={setComparisonRates}
			comparisonRates={comparisonRates}
			refetchSearch={refetchSearch}
		/>
	);
}

function ListRateCards({
	rates = [], detail = {},
	setSelectedCard = () => {},
	setScreen = () => {},
	setComparisonRates = () => {},
	comparisonRates = {},
	filters = {},
	setFilters = () => {},
	refetchSearch = () => {},
	selectedWeek = {},
	setSelectedWeek = () => {},
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
				total_rates_count={detail?.rates_count}
				comparisonRates={comparisonRates}
				setComparisonRates={setComparisonRates}
				setScreen={setScreen}
				refetch={refetchSearch}
			/>

			<Schedules
				paginationProps={paginationProps}
				filters={filters}
				setFilters={setFilters}
				setComparisonRates={setComparisonRates}
				setSelectedWeek={setSelectedWeek}
				selectedWeek={selectedWeek}
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
					setComparisonRates={setComparisonRates}
					comparisonRates={comparisonRates}
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
