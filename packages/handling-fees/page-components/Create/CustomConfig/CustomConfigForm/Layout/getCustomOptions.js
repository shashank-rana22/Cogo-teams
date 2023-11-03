import getCommodityList from '@cogoport/globalization/utils/getCommodityList';
import { getByKey } from '@cogoport/utils';

const OFFSET_LAST_INDEX = 1;
const getCustomOptions = ({ options_key = '', name = '', formValues = {}, isFieldArray = false, ...rest }) => {
	if (!options_key) return [];

	let formKeyName = rest.form_key;

	if (isFieldArray) {
		const splitArr = name.split('.');
		splitArr[splitArr.length - OFFSET_LAST_INDEX] = rest.form_key;
		formKeyName = (splitArr || []).join('.');
	}

	switch (options_key) {
		case 'commodity_list':
			return getCommodityList(rest.freight_type, getByKey(formValues, formKeyName));
		default: return [];
	}
};

export default getCustomOptions;
