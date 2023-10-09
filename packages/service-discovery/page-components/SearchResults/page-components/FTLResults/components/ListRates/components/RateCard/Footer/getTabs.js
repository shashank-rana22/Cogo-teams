import PriceBreakup from '../../../../../../../common/PriceBreakUp';
import TermsConditions from '../../../../../../../common/TermsConditions';

const getTabs = ({
	rate = {},
	detail = {},
}) => {
	const TABS_MAPPING = {
		terms_and_condition: {
			key       : 'terms_and_condition',
			label     : 'T&C',
			component : TermsConditions,
			props     : {
				rateCardData: rate,
				detail,
			},
		},
		price_break_up: {
			key       : 'price_break_up',
			label     : 'Price break up',
			component : PriceBreakup,
			props     : {
				rateCardData: rate,
				detail,
			},
		},
	};
	return TABS_MAPPING;
};

export default getTabs;
