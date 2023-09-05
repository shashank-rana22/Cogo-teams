import {
	InputController,
	PillsController,
	SelectController,
	DatepickerController,
	SingleDateRangeController,
	AsyncSelectController,
	TextAreaController,
	CheckboxController,
	CountrySelectController,
	UploadController,
	CheckboxGroupController,
	ToggleController,
	InputGroupController,
	CreatableSelectController,

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

		case 'input-group':
			return InputGroupController;

		case 'creatable-select':
			return CreatableSelectController;

		default:
			return null;
	}
};

export default getElementController;
