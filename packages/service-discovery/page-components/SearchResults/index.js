import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Header from '../../common/Header';

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

function SearchResults() {
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [headerProps, setHeaderProps] = useState({});

	const [screen, setScreen] = useState('listRateCard');
	const [selectedCard, setSelectedCard] = useState({});
	const [comparisonCheckbox, setComparisonCheckbox] = useState({});

	const {
		refetchSearch = () => {},
		loading,
		actualLoading,
		details:detail = {},
		rates = [],
		headerData,
		filters = {},
		setFilters = () => {},
	} = useGetSpotSearch();

	// useEffect(() => {
	// 	refetchSearch({ spot_search_id, importer_exporter_id });
	// }, [importer_exporter_id, refetchSearch, spot_search_id]);

	if (loading || actualLoading) {
		return (
			<div className={styles.loading}>
				<span className={styles.loading_text}>Looking for Rates</span>
				<Loader themeType="primary" className={styles.loader} background="#000" />
			</div>
		);
	}

	const rateCardsForComparison = rates.filter((rateCard) => Object.keys(comparisonCheckbox).includes(rateCard.card));

	const showComparison = rateCardsForComparison.length >= 2;

	const RateCardsComponent = SCREEN_MAPPING[screen];

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
			showFilterModal,
			setShowFilterModal,
		},
		selectedCard: {
			rateCardData: selectedCard,
			detail,
			setSelectedCard,
			selectedCard,
			setScreen,
			setHeaderProps,
			refetchSearch,
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

	return (
		<div className={`${styles.container} ${showAdditionalHeader ? styles.backdrop : {}}`}>
			<div className={styles.header}>
				<Header
					data={headerData || {}}
					showAdditionalHeader={showAdditionalHeader}
					setHeaderProps={setHeaderProps}
					headerProps={headerProps}
					loading={loading}
					activePage="search_results"
				/>
			</div>

			<div style={showAdditionalHeader ? { opacity: 0.5, pointerEvents: 'none' } : null}>
				<RateCardsComponent {...SCREEN_PROPS_MAPPING[screen || 'listRateCard']} />
			</div>
		</div>
	);
}

export default SearchResults;
