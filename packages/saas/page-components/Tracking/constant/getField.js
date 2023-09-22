import {
	AsyncSelectController,
	ChipsController,
	InputController,
	InputNumberController,
	MultiselectController,
	RadioController,
	SelectController,
	TimepickerController,
} from '@cogoport/forms';
import MobileNumberSelectController from '@cogoport/forms/page-components/Controlled/MobileNumberController';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';

const getField = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;

		case 'number':
			return InputNumberController;

		case 'mobile_number':
			return MobileNumberSelectController;

		case 'radio':
			return RadioController;

		case 'time_picker':
			return TimepickerController;

		case 'select':
			return SelectController;

		case 'multi_select':
			return MultiselectController;

		case 'async_select':
			return AsyncSelectController;

		case 'chips':
			return ChipsController;

		case 'file':
			return UploadController;

		default:
			return null;
	}
};

export default getField;
