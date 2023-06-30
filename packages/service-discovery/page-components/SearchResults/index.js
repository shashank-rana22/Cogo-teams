import { Loader } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useEffect, useState, useMemo } from 'react';

import BookCheckout from './components/BookToCheckout';
import Comparison from './components/Comparison';
import EditDetailsHeader from './components/EditDetailsHeader';
import Filters from './components/Filters';
import Header from './components/Header';
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
	const [pageLoading, setPageLoading] = useState(false);

	const { query } = useRouter();
	const { spot_search_id, importer_exporter_id } = query;
	const { refetchSearch, loading, data } = useGetSpotSearch();
	const { detail, rates = [] } = data || {};

	const [screen, setScreen] = useState('listRateCard');
	const [selectedCard, setSelectedCard] = useState({});
	const [comparisonCheckbox, setComparisonCheckbox] = useState({});

	const SUB_HEADER_COMPONENT_MAPPING = useMemo(() => ({
		edit_details: EditDetailsHeader,
	}), []);

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
	const Component = SUB_HEADER_COMPONENT_MAPPING[headerProps?.key] || null;

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
			<div className={styles.header}>
				<Header
					data={data?.detail}
					showAdditionalHeader={showAdditionalHeader}
					setShowAdditionalHeader={setShowAdditionalHeader}
					setHeaderProps={setHeaderProps}
					setShowFilterModal={setShowFilterModal}
				/>
			</div>

			{showAdditionalHeader ? (
				<Component {...headerProps} />
			) : null}

			{showFilterModal ? (
				<Filters
					data={data?.detail}
					show={showFilterModal}
					setShow={setShowFilterModal}
				/>
			) : null}

			<RateCardsComponent {...SCREEN_PROPS_MAPPING[screen || 'listRateCard']} />

		</div>
	);
}

export default SearchResults;
