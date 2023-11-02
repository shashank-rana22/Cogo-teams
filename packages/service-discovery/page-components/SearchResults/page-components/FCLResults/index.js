import Comparison from '../../common/Comparison';

import ListRateCards from './ListRateCards';
import SelectedCardScreen from './SelectedCardScreen';
import SpotBooking from './SpotBooking';

const SCREEN_MAPPING = {
	listRateCard       : ListRateCards,
	selectedCardScreen : SelectedCardScreen,
	comparison         : Comparison,
	spot_booking       : SpotBooking,
};

function FCLResults({
	rates = [],
	detail = {},
	contract_detail = {},
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
	paginationProps = {},
	loading = false,
	screen = '',
	infoBanner = {},
	setInfoBanner = () => {},
	isGuideViewed = false,
	routerLoading = false,
	setRouterLoading = () => {},
}) {
	const { cogoAssuredRates, marketplaceRates } = rates.reduce((acc, rate) => {
		if (rate.source === 'cogo_assured_rate') {
			return { ...acc, cogoAssuredRates: [...acc.cogoAssuredRates, rate] };
		}

		return { ...acc, marketplaceRates: [...acc.marketplaceRates, rate] };
	}, { cogoAssuredRates: [], marketplaceRates: [] });

	const SCREEN_PROPS_MAPPING = {
		listRateCard: {
			rates,
			detail,
			contract_detail,
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
			isGuideViewed,
			cogoAssuredRates,
			marketplaceRates,
			routerLoading,
			setRouterLoading,
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
			cogoAssuredRates,
			setRouterLoading,
		},
		spot_booking: {
			headerProps,
			setHeaderProps,
			screen,
			setScreen,
			cogoAssuredRates,
			setRouterLoading,
			detail,
		},
	};

	const RateCardsComponent = SCREEN_MAPPING[screen] || null;

	return (
		<RateCardsComponent {...SCREEN_PROPS_MAPPING[screen]} />
	);
}

export default FCLResults;
