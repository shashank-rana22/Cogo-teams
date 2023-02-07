import { InputController, MultiselectController, SelectController } from '@cogoport/forms';

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

		default:
			return null;
	}
};
