import ListRates from './components/ListRates';
import SelectedRateCard from './components/SelectedRateCard';

function FTLResults({
	rates = [],
	detail = {},
	contract_detail = {},
	setSelectedCard = () => {},
	selectedCard = {},
	filters = {},
	setFilters = () => {},
	setPage = () => {},
	selectedWeek = {},
	setSelectedWeek = () => {},
	refetchSearch:refetch = () => {},
	paginationProps = {},
	loading = false,
	screen = 'listRateCard',
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
				filters,
				setFilters,
				setPage,
				paginationProps,
				loading,
				selectedWeek,
				setSelectedWeek,
				refetch,
				setRouterLoading,
			},
		},
		selectedCardScreen: {
			component : SelectedRateCard,
			props     : {
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

export default FTLResults;
