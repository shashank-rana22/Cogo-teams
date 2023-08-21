import {
	AsyncSelectController,
	InputController,
	ChipsController,
	SelectController,
	DatepickerController,
	TextAreaController,
	CheckboxController,
	CheckboxGroupController,
	InputGroupController,
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

		case 'input-group':
			return InputGroupController;

		case 'multi-select':
		case 'multi_select':
			return MultiselectController;

		default:
			return null;
	}
};

export default getElementController;
