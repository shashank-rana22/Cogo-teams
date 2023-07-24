import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../common/EmptyState';
import Comparison from '../../components/Comparison';

import ListRateCards from './ListRateCards';
import SelectedCardScreen from './SelectedCardScreen';
import BookCheckout from './SelectedCardScreen/BookToCheckout';

const SCREEN_MAPPING = {
	listRateCard       : ListRateCards,
	selectedCardScreen : SelectedCardScreen,
	comparison         : Comparison,
	bookCheckout       : BookCheckout,
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
	headerProps = {},
	setHeaderProps = () => {},
	paginationProps,
	loading,
	screen,
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
		comparison: {
			setScreen,
			rateCardsForComparison,
		},
		selectedCardScreen: {
			headerProps,
			setHeaderProps,
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
