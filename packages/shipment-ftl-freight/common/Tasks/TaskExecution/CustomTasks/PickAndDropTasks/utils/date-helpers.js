import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const TIME = 0;

const getDateTimeWithDefaultHours = (date) => {
	const newDate = new Date(date);
	newDate.setHours(TIME, TIME, TIME, TIME);

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

export const ENTITY_CODES = Object.values(
	GLOBAL_CONSTANTS.cogoport_entities,
).reduce((acc, entity) => {
	if (entity.feature_supported.includes(FTL_TASK_DATE_VALIDATION)) {
		acc.push(entity?.id);
	}
	return acc;
}, []);
