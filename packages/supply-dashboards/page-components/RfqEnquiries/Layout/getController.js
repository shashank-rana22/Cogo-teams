import {
	InputController, PillsController, SelectController, DatepickerController,
} from '@cogoport/forms';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';

const getElementController = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;

		case 'select':
			return SelectController;

		case 'file':
			return UploadController;

		case 'pills':
			return PillsController;
		case 'date_picker':
			return DatepickerController;

		default:
			return null;
	}
};

export default getElementController;
