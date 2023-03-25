import { UploadController, InputController } from '@cogoport/forms';

const CONTROL_MAPPING = {
	video : InputController,
	image : UploadController,
	pdf   : UploadController,
};

export const getElementController = (name) => (
	CONTROL_MAPPING[name]
);
