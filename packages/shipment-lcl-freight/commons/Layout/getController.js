import {
	InputController, PillsController, SelectController, DatepickerController,
	ChipsController, ToggleController, UploadController,
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
			return UploadController;
		case 'pills':
			return PillsController;
		case 'date_picker':
			return DatepickerController;
		case 'chips':
			return ChipsController;
		case 'toggle':
			return ToggleController;
		default:
			return null;
	}
};

export default getElementController;
