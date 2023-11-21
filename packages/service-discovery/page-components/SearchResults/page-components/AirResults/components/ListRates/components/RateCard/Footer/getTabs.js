import PossibleSchedules from '../../../../../../../common/PossibleSchedules';
import PriceBreakup from '../../../../../../../common/PriceBreakUp';
import TermsConditions from '../../../../../../../common/TermsConditions';

const getTabs = ({
	rate = {},
	detail = {},
}) => ({
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
	possible_schedules: {
		key       : 'possible_schedules',
		label     : 'Possible Schedules',
		component : PossibleSchedules,
		props     : {
			rateCardData : rate,
			service_type : detail.service_type,
		},
	},
});

export default getTabs;
