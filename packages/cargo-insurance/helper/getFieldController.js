import {
	InputController,
	MobileNumberController,
	SelectController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text         : InputController,
	number       : InputController,
	select       : SelectController,
	mobileSelect : MobileNumberController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
