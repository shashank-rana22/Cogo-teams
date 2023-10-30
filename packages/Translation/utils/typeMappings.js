import { InputController, MultiselectController, SelectController, TextAreaController } from '@cogoport/forms';

export const getElementController = (type) => {
	switch (type) {
		case 'text':
			return InputController;

		case 'select':
			return SelectController;

		case 'multiSelect':
			return MultiselectController;

		case 'textArea':
			return TextAreaController;

		default:
			return null;
	}
};
