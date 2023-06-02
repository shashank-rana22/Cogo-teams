import { InputController, SelectController } from '@cogoport/forms';

const controlTypeControllerMapping = {
	number : InputController,
	select : SelectController,
	text   : InputController,
};

export const getController = (type = 'text') => controlTypeControllerMapping[type] || null;
