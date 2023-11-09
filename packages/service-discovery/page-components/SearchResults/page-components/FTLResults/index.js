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
	refetchSearch:refetch = () => {},
	paginationProps = {},
	loading = false,
	screen = 'listRateCard',
	setRouterLoading = () => {},
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
				filters,
				setFilters,
				paginationProps,
				loading,
				refetch,
				setRouterLoading,
				isMobile,
			},
		},
		selectedCardScreen: {
			component : SelectedRateCard,
			props     : {
				setRouterLoading,
				isMobile,
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
