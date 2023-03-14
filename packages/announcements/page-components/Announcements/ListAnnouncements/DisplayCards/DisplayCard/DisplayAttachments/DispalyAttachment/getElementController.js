import { UploadController, InputController } from '@cogoport/forms';

export const getElementController = (name) => {
	switch (name) {
		case 'video':
			return InputController;

		case 'image':
			return UploadController;

		case 'pdf':
			return UploadController;

		default:
			return null;
	}
};
