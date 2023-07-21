export const VIEW_TYPES = Object.freeze({
	VIEW : 'view',
	EDIT : 'edit',
});

export const CUSTOM_TYPES = Object.freeze({
	DOCUMENT : 'document',
	INPUT    : 'input',
});

export const TRUCK_STATE_KEYS = Object.freeze({
	SELECTED_TRUCK_NUMBER : 'selected_truck_number',
	NEW_TRUCK_NUMBER      : 'new _truck_number',
});

export const DEFAULT_TRUCK_SELECTION_STATE = {
	[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER] : null,
	[TRUCK_STATE_KEYS.NEW_TRUCK_NUMBER]      : null,
};
