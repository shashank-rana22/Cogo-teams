import Comparison from '../../common/Comparison';

import ListRates from './components/ListRates';
import SelectedRateCard from './components/SelectedRateCard';

function AIRResults({
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
	refetchSearch:refetch = () => {},
	paginationProps = {},
	loading = false,
	screen = 'listRateCard',
	infoBanner = {},
	setInfoBanner = () => {},
	isGuideViewed = false,
	setRouterLoading = () => {},
	setScheduleLoading = () => {},
	setSelectedSchedule = () => {},
	selectedSchedule = () => {},
	isMobile = false,
}) {
	const SCREENS_MAPPING = {
		listRateCard: {
			component : ListRates,
			props     : {
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
				refetch,
				infoBanner,
				setInfoBanner,
				isGuideViewed,
				setRouterLoading,
				setScheduleLoading,
				setSelectedSchedule,
				selectedSchedule,
				isMobile,
			},
		},
		comparison: {
			component : Comparison,
			props     : {
				detail,
				setScreen,
				comparisonRates,
				setComparisonRates,
				mode: 'air_freight',
				isMobile,
			},
		},
		selectedCardScreen: {
			component : SelectedRateCard,
			props     : {
				headerProps,
				setHeaderProps,
				detail,
				rates,
				refetch,
				setRouterLoading,
			},
		},
	};

	const { component:ActiveComponent, props = {} } = SCREENS_MAPPING[screen] || {};

	if (!ActiveComponent) return null;

	return (
		<ActiveComponent {...props} />
	);
}

export default AIRResults;
