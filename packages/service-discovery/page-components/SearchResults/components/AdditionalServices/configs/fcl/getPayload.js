import getCheckoutPayload from './getCheckoutPayload';
import getSearchResultsPayload from './getSearchResultsPayload';

const getPayload = ({
	detail = {},
	...restProps
}) => {
	const { spot_search_id = '', checkout_id = '' } = detail;

	const keyToUse = checkout_id ? 'checkout' : 'search_results';

	const MAPPING = {
		checkout: {
			func  : getCheckoutPayload,
			props : {
				checkout_id,
				detail,
				...restProps,
			},
		},
		search_results: {
			func  : getSearchResultsPayload,
			props : {
				spot_search_id,
				detail,
				...restProps,
			},
		},
	};

	const { func: funcToUse, props } = MAPPING[keyToUse];

	return funcToUse({ ...props });
};

export default getPayload;
