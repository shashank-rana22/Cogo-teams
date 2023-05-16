import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import getPayload from '../../../../../../../utils/getPayload';

const useHandleSubModuleComponent = ({
	onSaveSubModule,
	subModule,
	course_id,
	nodeIndex,
	course_module_id,
	setCourseSubModule,
}) => {
	const [showSubModule, setShowSubModule] = useState([]);

	const {
		control,
		formState: { errors = {} },
		handleSubmit,
		setValue,
	} = useForm();

	const onSubmit = (values) => {
		const { isNew = false, id = '' } = subModule || {};

		const payloadValues = getPayload({
			values,
			course_id,
			isNew,
			nodeIndex,
			subModuleId : id,
			course_module_id,
			payloadType : 'sub_module',
		});

		onSaveSubModule({ values: payloadValues, subModule });
	};

	const hideEditComponent = () => {
		setShowSubModule((prev) => prev.filter((item) => item !== subModule.id));
	};

	const deleteSubModule = () => {
		if (subModule.isNew) {
			setCourseSubModule((prev) => prev.filter((item) => item.id !== subModule.id));
		}
	};

	useEffect(() => {
		if (!subModule.isNew) {
			setValue('name', subModule.name);
			setValue('description', subModule.description);
		}
	}, [subModule, setValue]);

	return {
		handleSubmit,
		control,
		errors,
		onSubmit,
		showSubModule,
		deleteSubModule,
		hideEditComponent,
		setShowSubModule,
	};
};

export default useHandleSubModuleComponent;
