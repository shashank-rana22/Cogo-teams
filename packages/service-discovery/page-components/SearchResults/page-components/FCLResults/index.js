import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../common/EmptyState';
import BookCheckout from '../../components/BookToCheckout';
import Comparison from '../../components/Comparison';

import ListRateCards from './ListRateCards';
import SelectedRateCard from './SelectedRateCard';

const SCREEN_MAPPING = {
	listRateCard : ListRateCards,
	selectedCard : SelectedRateCard,
	comparison   : Comparison,
	bookCheckout : BookCheckout,
};

function FCLResults({
	rates = [],
	detail = {},
	setSelectedCard = () => {},
	selectedCard = {},
	setScreen = () => {},
	setComparisonCheckbox = () => {},
	showComparison = false,
	rateCardsForComparison = [],
	comparisonCheckbox = [],
	filters = {},
	setFilters = () => {},
	paginationProps,
	loading,
	setHeaderProps,
	refetchSearch,
	screen,
	possible_subsidiary_services,
}) {
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
			paginationProps,
			loading,
		},
		selectedCard: {
			rateCardData : selectedCard,
			detail,
			setSelectedCard,
			setScreen,
			setHeaderProps,
			refetchSearch,
			screen,
			possible_subsidiary_services,
			listLoading  : loading,
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

	const RateCardsComponent = SCREEN_MAPPING[screen] || null;

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
}

export default FCLResults;
