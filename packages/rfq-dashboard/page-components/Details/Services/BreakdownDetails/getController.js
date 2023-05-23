import { InputController, SelectController } from '@cogoport/forms';

const controlTypeControllerMapping = {
	number : InputController,
	select : SelectController,

};

export const getController = (type = 'text') => controlTypeControllerMapping[type] || null;
