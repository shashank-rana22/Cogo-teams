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
	paginationProps,
	loading,
	screen,
	infoBanner = {},
	setInfoBanner = () => {},
	isGuideViewed = false,
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
		},
	};

	const RateCardsComponent = SCREEN_MAPPING[screen] || null;

	if (!loading && isEmpty(rates) && screen === 'listRateCard') {
		return (
			<EmptyState
				details={detail}
				filters={filters}
				setFilters={setFilters}
				refetch={refetchSearch}
			/>
		);
	}

	return (
		<RateCardsComponent {...SCREEN_PROPS_MAPPING[screen]} />
	);
}

export default FCLResults;
