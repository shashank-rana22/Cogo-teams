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
	setComparisonRates = () => {},
	comparisonRates = {},
	filters = {},
	setFilters = () => {},
	headerProps = {},
	setHeaderProps = () => {},
	selectedWeek = {},
	setSelectedWeek = () => {},
	refetchSearch = () => {},
	paginationProps,
	loading,
	screen,
	infoBanner = {},
	setInfoBanner = () => {},
}) {
	const SCREEN_PROPS_MAPPING = {
		listRateCard: {
			rates,
			detail,
			setSelectedCard,
			selectedCard,
			setScreen,
			setComparisonRates,
			comparisonRates,
			filters,
			setFilters,
			paginationProps,
			loading,
			selectedWeek,
			setSelectedWeek,
			refetchSearch,
			infoBanner,
			setInfoBanner,
		},
		comparison: {
			detail,
			setScreen,
			comparisonRates,
			setComparisonRates,
		},
		selectedCardScreen: {
			headerProps,
			setHeaderProps,
			screen,
			setScreen,
		},
	};

	const RateCardsComponent = SCREEN_MAPPING[screen] || null;

	if (!loading && isEmpty(rates) && screen === 'listRateCard') {
		return (
			<EmptyState
				details={detail}
				filters={filters}
				setFilters={setFilters}
			/>
		);
	}

	return (
		<RateCardsComponent {...SCREEN_PROPS_MAPPING[screen]} />
	);
}

export default FCLResults;
