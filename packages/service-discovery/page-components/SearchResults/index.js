import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Header from '../../common/Header';

import FCLResults from './components/FCLResults';
// import ListRateCards from './components/FCLResults/ListRateCards';
import useGetSpotSearch from './hooks/useGetSpotSearch';
import styles from './styles.module.css';

// const SERVICE_MAPPING = {
// 	fcl_freight: ListRateCards,
// };

// Listratecards ki mapping krdo not card

const MAGIC_NUMBER = 2;

function SearchResults() {
	const [headerProps, setHeaderProps] = useState({});
	const [comparisonCheckbox, setComparisonCheckbox] = useState({});

	const {
		refetchSearch = () => {},
		loading = false,
		data = {},
		filters = {},
		setFilters = () => {},
		screen,
		setScreen,
		setSelectedCard,
		selectedCard,
	} = useGetSpotSearch();

	const {
		spot_search_detail:detail = {},
		list:rates = [],
		possible_subsidiary_services = [],
		total_count,
		page,
		page_limit,
	} = data || {};
	// const { detail = {}, rates = [], possible_subsidiary_services = [] } = data || {};

	const paginationProps = { page, page_limit, total_count };

	const rateCardsForComparison = rates.filter((rateCard) => Object.keys(comparisonCheckbox).includes(rateCard.card));

	const showComparison = rateCardsForComparison.length >= MAGIC_NUMBER;

	const showAdditionalHeader = headerProps && !isEmpty(headerProps);

	if (loading && isEmpty(data)) {
		return (
			<div className={styles.loading}>
				<span className={styles.loading_text}>Looking for Rates</span>
				<Loader themeType="primary" className={styles.loader} background="#000" />
			</div>
		);
	}

	return (
		<div className={`${styles.container} ${showAdditionalHeader ? styles.backdrop : {}}`}>
			<Header
				data={detail}
				showAdditionalHeader={showAdditionalHeader}
				setHeaderProps={setHeaderProps}
				headerProps={headerProps}
				loading={loading}
				activePage="search_results"
				currentScreen={screen}
				setCurrentScreen={setScreen}
			/>

			<div style={showAdditionalHeader ? { opacity: 0.6, pointerEvents: 'none' } : null}>
				<FCLResults
					rates={rates}
					detail={detail}
					setSelectedCard={setSelectedCard}
					selectedCard={selectedCard}
					setScreen={setScreen}
					setComparisonCheckbox={setComparisonCheckbox}
					showComparison={showComparison}
					rateCardsForComparison={rateCardsForComparison}
					comparisonCheckbox={comparisonCheckbox}
					filters={filters}
					setFilters={setFilters}
					paginationProps={paginationProps}
					loading={loading}
					setHeaderProps={setHeaderProps}
					refetchSearch={refetchSearch}
					screen={screen}
					possible_subsidiary_services={possible_subsidiary_services}
				/>
			</div>

		</div>
	);
}

export default SearchResults;
