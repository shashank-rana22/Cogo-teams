import { InputController, SelectController, AsyncSelectController } from '@cogoport/forms';

const getElementController = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;
		case 'select':
			return SelectController;
		case 'asyncSelect':
			return AsyncSelectController;
		default:
			return null;
	}
};

export default getElementController;
