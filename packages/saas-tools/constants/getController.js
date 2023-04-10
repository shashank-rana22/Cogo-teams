import { InputController, PillsController, SelectController } from '@cogoport/forms';

const getElementController = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;

		case 'select':
			return SelectController;
		default:
			return null;
	}
};

export default getElementController;
