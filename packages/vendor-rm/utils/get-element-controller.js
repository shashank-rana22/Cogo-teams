import { InputController, MultiselectController, SelectController, UploadController } from '@cogoport/forms';

export const getElementController = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;

		case 'select':
			return SelectController;

		case 'multiSelect':
			return MultiselectController;

		case 'file':
			return UploadController;

		default:
			return null;
	}
};
