import {
	InputController,
	PillsController,
	SelectController,
	DatepickerController,
	SingleDateRangeController,
	AsyncSelectController,
} from '@cogoport/forms';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';

const getElementController = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;

		case 'number':
			return InputController;

		case 'select':
			return SelectController;

		case 'async_select':
			return AsyncSelectController;

		case 'file':
			return UploadController;

		case 'pills':
			return PillsController;

		case 'date_picker':
			return DatepickerController;

		case 'date_range_picker':
			return SingleDateRangeController;

		default:
			return null;
	}
};

export default getElementController;
