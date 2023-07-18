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
	InputGroupController,
	CreatableSelectController,
	RadioGroupController,
	MultiselectController,
} from '@cogoport/forms';

const getElementController = (type) => {
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
		case 'chips':
			return ChipsController;

		case 'date_picker':
		case 'datepicker':
			return DatepickerController;

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

		case 'radio':
			return RadioGroupController;

		case 'multi-select':
		case 'multi_select':
			return MultiselectController;

		default:
			return null;
	}
};

export default getElementController;
