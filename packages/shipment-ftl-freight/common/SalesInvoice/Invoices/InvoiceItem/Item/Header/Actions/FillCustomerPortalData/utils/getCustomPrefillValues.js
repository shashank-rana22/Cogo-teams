import getDate from '../../commons/utils/getDate';
import { DATA_OBJECT_KEYS_MAPPING } from '../../commons/utils/getFormatValue';

const getCustomPrefillValues = ({
	finalControls = [],
	customData = {},
	data = {},
}) => {
	const DEFAULT_VALUES = {};
	finalControls.forEach((control) => {
		if (control.type === 'datepicker') {
			DEFAULT_VALUES[control?.name] = getDate(customData[control?.name]);
		} else {
			const entryAdded = Object.entries(DATA_OBJECT_KEYS_MAPPING).some(
				([dataObjKey, dataObjValue]) => {
					if (dataObjValue.includes(control?.name)) {
						DEFAULT_VALUES[control?.name] = customData?.[dataObjKey]?.[control?.name];
						return true;
					}
					return false;
				},
			);
			if (!entryAdded) {
				DEFAULT_VALUES[control?.name] = customData[control?.name];
			}
		}
	});
	DEFAULT_VALUES.customer_organization = (data?.list || []).find(
		(item) => item.trade_party_type === 'shipper',
	)?.trade_party_id;

	return DEFAULT_VALUES;
};

export default getCustomPrefillValues;
