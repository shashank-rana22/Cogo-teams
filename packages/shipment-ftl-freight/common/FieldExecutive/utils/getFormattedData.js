import { v4 as uuid } from 'uuid';

import { CUSTOM_TYPES } from './pageMappings';
import { ALL_STEPPER_CONFIGS_OBJ } from './stepperConfigs';

const formatSingleData = (item, rawSingleData, formattedData) => {
	const tempFormatData = formattedData;
	if (item.customType === CUSTOM_TYPES.DOCUMENT) {
		tempFormatData.data[item.key] = Array.isArray(rawSingleData)
			? rawSingleData.map((val) => ({
				id  : uuid(),
				url : val,
			}))
			: null;
	} else {
		tempFormatData.inputData[item.key] = rawSingleData;
	}
};

export const getFormattedData = (rawData) => {
	const formattedData = {
		data      : {},
		inputData : {},
	};

	Object.values(ALL_STEPPER_CONFIGS_OBJ).forEach((singleItem) => {
		(singleItem || []).forEach((item) => {
			let rawValue = '';
			if (!('dataMainAccess' in item)) {
				rawValue = rawData?.[item.dataAccessKey];
			} else if (!('dataSubAccess' in item)) {
				rawValue = rawData?.[item.dataMainAccess]?.[item.dataAccessKey];
			} else {
				rawValue =					rawData?.[item.dataMainAccess]?.[item.dataSubAccess]?.[
					item.dataAccessKey
				];
			}
			formatSingleData(item, rawValue, formattedData);
		});
	});

	return formattedData;
};
