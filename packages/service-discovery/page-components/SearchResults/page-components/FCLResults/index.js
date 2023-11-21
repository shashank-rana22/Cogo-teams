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
	refetchSearch = () => {},
	paginationProps = {},
	loading = false,
	screen = '',
	infoBanner = {},
	setInfoBanner = () => {},
	isGuideViewed = false,
	setRouterLoading = () => {},
	setScheduleLoading = () => {},
	scheduleLoading = false,
	setSelectedSchedule = () => {},
	selectedSchedule = () => {},
	isMobile = false,
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
			refetchSearch,
			infoBanner,
			setInfoBanner,
			isGuideViewed,
			cogoAssuredRates,
			marketplaceRates,
			setRouterLoading,
			setScheduleLoading,
			scheduleLoading,
			setSelectedSchedule,
			selectedSchedule,
			isMobile,
		},
		comparison: {
			detail,
			setScreen,
			comparisonRates,
			setComparisonRates,
			isMobile,
		},
		selectedCardScreen: {
			headerProps,
			setHeaderProps,
			screen,
			setScreen,
			cogoAssuredRates,
			setRouterLoading,
			isMobile,
			refetchSearch,
		},
		spot_booking: {
			setScreen,
			detail,
		},
	};

	const RateCardsComponent = SCREEN_MAPPING[screen] || null;

	if (!RateCardsComponent) return null;

	return (
		<RateCardsComponent {...SCREEN_PROPS_MAPPING[screen]} />
	);
}

export default FCLResults;
