import {
	AsyncSelectController,
	InputController,
	ChipsController,
	SelectController,
	DatepickerController,
	TextAreaController,
	CheckboxController,
} from '@cogoport/forms';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';

import DepartureDateSelectController from './DepartureDateSelect/index';

const getElementController = (type = 'text') => {
	console.log('typeeeeee', type);
	switch (type) {
		case 'async-select':
			return AsyncSelectController;

		case 'text':
			return InputController;

		case 'number':
			return InputController;

		case 'select':
			return SelectController;

		case 'file':
			return UploadController;

		case 'pills':
			return ChipsController;

		case 'date_picker':
		case 'datepicker':
			console.log('datePicker');
			return DatepickerController;

		case 'departure_date':
			return DepartureDateSelectController;

		case 'textArea':
			return TextAreaController;

		case 'checkbox':
			return CheckboxController;

		default:
			return InputController;
	}
};

export default getElementController;
