import { InputController, MultiselectController, SelectController } from '@cogoport/forms';
import CreatableMultiSelectController from '@cogoport/forms/page-components/Controlled/CreatableMultiSelectController';
import TextAreaController from '@cogoport/forms/page-components/Controlled/TextAreaController';

export const getElementController = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;

		case 'select':
			return SelectController;

		case 'multiSelect':
			return MultiselectController;

		case 'number':
			return InputController;

		case 'creatable_multiselect':
			return CreatableMultiSelectController;

		case 'text_area':
			return TextAreaController;

		default:
			return null;
	}
};
