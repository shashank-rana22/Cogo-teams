import { InputController } from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	input: InputController,

};

export const getFieldArrayControllers = (type = 'text') => CONTROLLER_MAPPING[type] || null;
