import {
	AsyncSelectController,
	InputController,
	ChipsController,
	SelectController,
	DatepickerController,
	TextAreaController,
	CheckboxController,
	CountrySelectController,
	UploadController,
	CheckboxGroupController,
	ToggleController,
	RadioGroupController,
} from '@cogoport/forms';

import DepartureDateSelectController from './DepartureDateSelect/index';

const getElementController = (type = 'text') => {
	switch (type) {
		case 'async-select':
			return AsyncSelectController;

		case 'text':
		case 'number':
			return InputController;

		case 'select':
			return SelectController;

		case 'file':
			return UploadController;

		case 'pills':
		case 'chips':
			return ChipsController;

		case 'date_picker':
		case 'datepicker':
			return DatepickerController;

		case 'departure_date':
			return DepartureDateSelectController;

		case 'textArea':
		case 'textarea':
			return TextAreaController;

		case 'checkbox':
			return CheckboxController;

		case 'checkbox_group':
			return CheckboxGroupController;

		case 'country_select':
			return CountrySelectController;

		case 'toggle':
			return ToggleController;

		case 'radio':
			return RadioGroupController;

		default:
			return InputController;
	}
};

export default getElementController;
