import { useEffect, useMemo } from 'react';

import { DATA_OBJECT_KEYS_MAPPING } from '../../commons/utils/getFormatValue';

const getDate = (date) => {
	const tempDate = new Date(date);

	if (date && tempDate.toDateString() !== 'Invalid Date') {
		return tempDate;
	}
	return null;
};

export const useFillFormData = ({
	customData = {},
	finalControls = [],
}) => {
	const defaultValues = useMemo(() => ({}), []);

	useEffect(() => {
		if (customData) {
			finalControls.forEach((control) => {
				if (control.type === 'datepicker') {
					defaultValues[control?.name] = getDate(customData[control?.name]);
				} else {
					const entryAdded = Object.entries(DATA_OBJECT_KEYS_MAPPING).some(
						([dataObjKey, dataObjValue]) => {
							if (dataObjValue.includes(control?.name)) {
								defaultValues[control?.name] = customData?.[dataObjKey]?.[control?.name];
								return true;
							}
							return false;
						},
					);
					if (!entryAdded) {
						defaultValues[control?.name] = customData[control?.name];
					}
				}
			});
		}
	}, [customData, defaultValues, finalControls]);

	return defaultValues;
};
