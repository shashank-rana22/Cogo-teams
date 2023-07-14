import { isEmpty } from '@cogoport/utils';

import { CUSTOM_TYPES } from './pageMappings';
import { ALL_STEPPER_CONFIGS_OBJ } from './stepperConfigs';

const functionObjectCreator = (formatData, str, val) => {
	if (isEmpty(str)) {
		return formatData;
	}
	const [head, ...rest] = str.split('.');
	const newData = { ...formatData };
	newData[head] = rest.length
		? functionObjectCreator(newData[head], rest.join('.'), val)
		: val;

	return newData;
};

const formatSingleData = (
	path,
	item,
	initFormattedData,
	otherFormattedData,
	formattedData,
) => {
	let tempValue = '';
	if (item?.customType === CUSTOM_TYPES.DOCUMENT) {
		tempValue = initFormattedData[item?.key]?.map((val) => val.url);
	} else {
		tempValue = otherFormattedData[item?.key] || '';
	}
	return functionObjectCreator(formattedData, path, tempValue);
};

export const formatFinalData = ({
	shipment_id = '',
	truck_number = '',
	initFormattedData = {},
	otherFormattedData = {},
}) => {
	let formattedData = {
		truck_number,
		shipment_id,
	};

	Object.values(ALL_STEPPER_CONFIGS_OBJ).forEach((singleItem) => {
		(singleItem || []).forEach((item) => {
			let path = '';
			if (!('dataMainAccess' in item)) {
				path = item?.dataAccessKey;
			} else if (!('dataSubAccess' in item)) {
				path = `${item?.dataMainAccess}.${item?.dataAccessKey}`;
			} else {
				path = `${item?.dataMainAccess}.${item.dataSubAccess}.${item?.dataAccessKey}`;
			}

			formattedData = formatSingleData(
				path,
				item,
				initFormattedData,
				otherFormattedData,
				formattedData,
			);
		});
	});

	return formattedData;
};
