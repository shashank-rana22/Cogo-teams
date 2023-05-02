import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import DynamicFormComponent from '../DynamicFormComponent';

function RenderDynamicFormComponent({
	dynamicControls,
	dynamicControlErrors,
	formData,
	dynamicControl,
	dynamicHandleSubmit,
	onDynamicFormSubmit,
	handleEditForm,
	setShow,
	modeType,
}) {
	if (!isEmpty(dynamicControls)) {
		return (
			<DynamicFormComponent
				errors={dynamicControlErrors || {}}
				formData={formData}
				control={dynamicControl}
				dynamicHandleSubmit={dynamicHandleSubmit}
				onDynamicFormSubmit={onDynamicFormSubmit}
				handleEditForm={handleEditForm}
				modeType={modeType}
			/>
		);
	}

	return (
		<div>
			<IcMPlusInCircle
				height="22px"
				width="22px"
				cursor="pointer"
				onClick={() => { if (modeType === 'edit') { setShow(true); } }}
			/>
			<div>Click here to start Customizing your form</div>
		</div>
	);
}

export default RenderDynamicFormComponent;
