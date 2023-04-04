import {
	InputController, PillsController, SelectController, DatepickerController, ChipsController,
} from '@cogoport/forms';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';

import ToggleController from './Item/ToggleController';

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
