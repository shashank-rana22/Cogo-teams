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

	const { detail = {}, rates = [] } = data || {};

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
		},
		selectedCard: {
			rateCardData: selectedCard,
			detail,
			setSelectedCard,
			setScreen,
			setHeaderProps,
			refetchSearch,
			screen,
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

	if (loading) {
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

			<div style={showAdditionalHeader ? { opacity: 0.5, pointerEvents: 'none' } : null}>
				{handleRatesList()}
			</div>
		</div>
	);
}

export default SearchResults;
