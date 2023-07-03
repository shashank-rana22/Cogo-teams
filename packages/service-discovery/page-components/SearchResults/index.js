import { Loader } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useEffect, useState, useMemo } from 'react';

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
	const [showAdditionalHeader, setShowAdditionalHeader] = useState(false);
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [headerProps, setHeaderProps] = useState({});
	const [filters, setFilters] = useState({
		currency: 'USD',
	});

	const [pageLoading, setPageLoading] = useState(false);
	const [screen, setScreen] = useState('listRateCard');
	const [selectedCard, setSelectedCard] = useState({});
	const [comparisonCheckbox, setComparisonCheckbox] = useState({});

	const { query } = useRouter();
	const { spot_search_id, importer_exporter_id } = query;
	const { refetchSearch, loading, data } = useGetSpotSearch();
	const { detail, rates = [] } = data || {};

	useEffect(() => {
		refetchSearch({ spot_search_id, importer_exporter_id });
	}, [importer_exporter_id, refetchSearch, spot_search_id]);

	if (pageLoading || loading) {
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

	return (
		<div className={styles.container}>
			<Header
				data={data?.detail}
				showAdditionalHeader={showAdditionalHeader}
				setShowAdditionalHeader={setShowAdditionalHeader}
				setHeaderProps={setHeaderProps}
				headerProps={headerProps}
				loading={loading}
				activePage="search_results"
			/>

			<div style={showAdditionalHeader ? { opacity: 0.5, pointerEvents: 'none' } : null}>

				<RateCardsComponent {...SCREEN_PROPS_MAPPING[screen || 'listRateCard']} />

			</div>

		</div>
	);
}

export default SearchResults;
