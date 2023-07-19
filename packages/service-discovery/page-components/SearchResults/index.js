import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Header from '../../common/Header';

import EmptyState from './common/EmptyState';
import BookCheckout from './components/BookToCheckout';
import Comparison from './components/Comparison';
import ListRateCards from './components/ListRateCards';
import SelectedRateCard from './components/SelectedRateCard';
import useGetSpotSearch from './hooks/useGetSpotSearch';
import styles from './styles.module.css';

const SCREEN_MAPPING = {
	listRateCard : ListRateCards,
	selectedCard : SelectedRateCard,
	comparison   : Comparison,
	bookCheckout : BookCheckout,
};

// Listratecards ki mapping krdo not card

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
		weekly_data = [],
		total_count,
		page,
		page_limit,
	} = data || {};
	// const { detail = {}, rates = [], possible_subsidiary_services = [] } = data || {};

	const paginationProps = { page, page_limit, total_count };

	const rateCardsForComparison = rates.filter((rateCard) => Object.keys(comparisonCheckbox).includes(rateCard.card));

	const showComparison = rateCardsForComparison.length >= 2;

	const SCREEN_PROPS_MAPPING = {
		listRateCard: {
			rates,
			detail,
			setSelectedCard,
			selectedCard,
			setScreen,
			setComparisonCheckbox,
			showComparison,
			rateCardsForComparison,
			comparisonCheckbox,
			filters,
			setFilters,
			weekly_data,
			paginationProps,
			loading,
		},
		selectedCard: {
			rateCardData: selectedCard,
			detail,
			setSelectedCard,
			setScreen,
			setHeaderProps,
			refetchSearch,
			screen,
			possible_subsidiary_services,
		},
		comparison: {
			setScreen,
			rateCardsForComparison,
		},
		bookCheckout: {
			rateCardData: selectedCard,
			detail,
			setSelectedCard,
			setScreen,
		},
	};
	const showAdditionalHeader = headerProps && !isEmpty(headerProps);

	const RateCardsComponent = SCREEN_MAPPING[screen] || null;

	const handleRatesList = () => {
		if (!loading && isEmpty(rates)) {
			return (
				<EmptyState
					data={detail}
					filters={filters}
					setFilters={setFilters}
				/>
			);
		}
		return (
			<RateCardsComponent {...SCREEN_PROPS_MAPPING[screen || 'listRateCard']} />
		);
	};

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
				{handleRatesList()}
			</div>
		</div>
	);
}

export default SearchResults;
