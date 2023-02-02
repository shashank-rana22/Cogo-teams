import { InputController, ChipsController, SelectController } from '@cogoport/forms';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';

const getElementController = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;

		case 'select':
			return SelectController;

		case 'file':
			return UploadController;

		case 'chips':
			return ChipsController;

		default:
			return null;
	}
};

export default getElementController;
