import {
	SelectController,
	InputController,
	AsyncSelectController,
	DateRangePickerController,
	ChipsController,
	RadioGroupController,
} from '@cogoport/forms';

function getElementController(type) {
	switch (type) {
		case 'async-select':
			return AsyncSelectController;
		case 'select':
			return SelectController;
		case 'input':
			return InputController;
		case 'date-picker':
			return DateRangePickerController;
		case 'container-details':
			return SelectController;
		case 'chips':
			return ChipsController;
		case 'radioGroup':
			return RadioGroupController;
		default:
			return SelectController;
	}
}

export default getElementController;
