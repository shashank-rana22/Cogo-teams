import {
	SelectController,
	InputController,
	AsyncSelectController,
	DateRangePickerController,
	ChipsController,
	RadioGroupController,
	TextAreaController,
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
		case 'textarea':
			return TextAreaController;
		default:
			return SelectController;
	}
}

export default getElementController;
