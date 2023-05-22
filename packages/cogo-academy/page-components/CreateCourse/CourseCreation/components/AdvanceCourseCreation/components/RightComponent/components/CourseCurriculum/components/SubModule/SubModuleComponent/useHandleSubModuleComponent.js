import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import useCommonDeleteApi from '../../../../../../../hooks/useCommonDeleteApi';
import getPayload from '../../../../../../../utils/getPayload';

const useHandleSubModuleComponent = ({
	onSaveSubModule,
	subModule,
	course_id,
	nodeIndex,
	course_module_id,
	setCourseSubModule,
	getCourseModuleDetails,
	courseSubModule,
}) => {
	const [showSubModule, setShowSubModule] = useState([]);

	const {
		control,
		formState: { errors = {} },
		handleSubmit,
		setValue,
	} = useForm();

	const { loading: deleteLoading, commonDeleteApi } = useCommonDeleteApi({
		finalData : courseSubModule,
		getCourseModuleDetails,
		type      : 'sub_module',
	});

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

	const deleteSubModule = ({ length }) => {
		if (length === 1) {
			Toast.error('cannot delete as there should be atleast one sub-module');
			return;
		}

		if (subModule.isNew) {
			setCourseSubModule((prev) => prev.filter((item) => item.id !== subModule.id));
			return;
		}

		const deletePayloadValues = getPayload({
			course_id,
			subModuleId : subModule.id,
			payloadType : 'sub_module',
			action_type : 'delete',
		});

		commonDeleteApi({ idToDelete: subModule.id, deletePayloadValues });
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
		deleteLoading,
	};
};

export default useHandleSubModuleComponent;
