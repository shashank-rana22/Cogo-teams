import {
	InputController,
	PillsController,
	SelectController,
	DatepickerController,
	TextAreaController,
	AsyncSelectController,
	CheckboxController,
	UploadController,
} from '@cogoport/forms';

const getElementController = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;

		case 'textarea':
			return TextAreaController;

		case 'number':
			return InputController;

		case 'select':
			return SelectController;

		case 'file':
			return UploadController;

		case 'pills':
			return PillsController;

		case 'checkbox':
			return CheckboxController;

		case 'date_picker':
			return DatepickerController;

		case 'async-select':
			return AsyncSelectController;

		default:
			return null;
	}
};

export default getElementController;
