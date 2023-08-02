import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const DEFAULT_TIME = 0;

const getDateTimeWithDefaultHours = (date) => {
	const newDate = new Date(date);
	// setHours(hoursValue, minutesValue, secondsValue, msValue)
	newDate.setHours(DEFAULT_TIME, DEFAULT_TIME, DEFAULT_TIME, DEFAULT_TIME);

	return newDate.getTime();
};

export const datesChecker = (leftDate, rightDate) => {
	if (!leftDate || !rightDate) {
		return false;
	}
	const leftDateTime = getDateTimeWithDefaultHours(leftDate);
	const rightDateTime = getDateTimeWithDefaultHours(rightDate);

	return leftDateTime > rightDateTime;
};

export const dateCheckerShipment = (leftDate, rightDate) => {
	if (!leftDate || !rightDate) {
		return false;
	}
	const leftDateTime = new Date(leftDate).getTime();
	const rightDateTime = new Date(rightDate).getTime();

	return leftDateTime >= rightDateTime;
};

const FTL_TASK_DATE_VALIDATION = 'ftl_task_date_validation';

const ENTITY_IDS = [];

export const ENTITY_CODES = Object.entries(GLOBAL_CONSTANTS.cogoport_entities).map(([key, value]) => {
	ENTITY_FEATURE_MAPPING[key].feature_supported.includes(FTL_TASK_DATE_VALIDATION);
	return ENTITY_IDS.push(value.id);
});
