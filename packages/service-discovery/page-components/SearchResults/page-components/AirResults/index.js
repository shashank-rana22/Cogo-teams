import Comparison from '../../common/Comparison';

import ListRates from './components/ListRates';
import SelectedRate from './components/SelectedRate';

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
	setPage = () => {},
	headerProps = {},
	setHeaderProps = () => {},
	selectedWeek = {},
	setSelectedWeek = () => {},
	refetchSearch:refetch = () => {},
	paginationProps = {},
	loading = false,
	screen = 'listRateCard',
	infoBanner = {},
	setInfoBanner = () => {},
	isGuideViewed = false,
	routerLoading = false,
	setRouterLoading = () => {},
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
				setPage,
				paginationProps,
				loading,
				selectedWeek,
				setSelectedWeek,
				refetch,
				infoBanner,
				setInfoBanner,
				isGuideViewed,
				routerLoading,
				setRouterLoading,
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
			},
		},
		selectedCardScreen: {
			component : SelectedRate,
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
