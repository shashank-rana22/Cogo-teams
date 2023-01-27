import {
	InputController, PillsController, SelectController,
	DatepickerController, FileSelectController,
} from '@cogoport/forms';

const getElementController = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;

		case 'number':
			return InputController;

		case 'select':
			return SelectController;

		case 'file':
			return FileSelectController;

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
