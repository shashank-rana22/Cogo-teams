import Comparison from '../../common/Comparison';

import ListRates from './components/ListRates';

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
	// headerProps = {},
	// setHeaderProps = () => {},
	selectedWeek = {},
	setSelectedWeek = () => {},
	refetchSearch:refetch = () => {},
	paginationProps = {},
	loading = false,
	screen = 'listRateCard',
	infoBanner = {},
	setInfoBanner = () => {},
	isGuideViewed = false,
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
			},
			comparison: {
				component : Comparison,
				props     : {
					detail,
					setScreen,
					comparisonRates,
					setComparisonRates,
				},
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
