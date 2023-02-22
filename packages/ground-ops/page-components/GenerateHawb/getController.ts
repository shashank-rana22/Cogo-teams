import {
	InputController, TextAreaController, PillsController, SelectController,
	DatepickerController,
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

		case 'pills':
			return PillsController;

		case 'checkbox':
			return PillsController;

		case 'datepicker':
			return DatepickerController;

		default:
			return null;
	}
};

export default getElementController;
