import {
	AsyncSelectController,
	InputController,
	ChipsController,
	SelectController,
	DatepickerController,
	TextAreaController,
	CheckboxController,
	CountrySelectController,
} from '@cogoport/forms';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';

import DepartureDateSelectController from './DepartureDateSelect/index';

const getElementController = (type = 'text') => {
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
			return DatepickerController;

		case 'departure_date':
			return DepartureDateSelectController;

		case 'textArea':
			return TextAreaController;

		case 'checkbox':
			return CheckboxController;

		case 'country_select':
			return CountrySelectController;

		default:
			return InputController;
	}
};

export default getElementController;
