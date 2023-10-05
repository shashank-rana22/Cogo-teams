import {
	InputController,
	PillsController,
	SelectController,
	DatepickerController,
	UploadController,
	AsyncSelectController,
	InputGroupController,
} from '@cogoport/forms';

import DepartureDateSelectController from './DepartureDateSelect/index';

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

		case 'departure_date':
			return DepartureDateSelectController;

		case 'async_select':
			return AsyncSelectController;

		case 'input-group':
			return InputGroupController;

		default:
			return null;
	}
};

export default getElementController;
