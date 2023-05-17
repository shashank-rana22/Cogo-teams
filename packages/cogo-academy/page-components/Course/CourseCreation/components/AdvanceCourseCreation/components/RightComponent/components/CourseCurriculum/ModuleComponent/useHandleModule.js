import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import useCommonCreateApi from '../../../../../hooks/useCommonCreateApi';
import useCommonDeleteApi from '../../../../../hooks/useCommonDeleteApi';
import useCommonUpdateApi from '../../../../../hooks/useCommonUpdateApi';
import getPayload from '../../../../../utils/getPayload';

const useHandleModule = ({
	getLoading,
	setFinalData,
	getCourseModuleDetails,
	module,
	nodeIndex,
	id,
	finalData,
}) => {
	const [showModule, setShowModule] = useState([]);

	const { control, formState:{ errors = {} }, handleSubmit, setValue } = useForm();

	const {
		commonCreateApi,
		loading: createModuleLoading,
	} = useCommonCreateApi({ getCourseModuleDetails });

	const {
		commonUpdateApi,
		loading:updateModuleLoading,
	} = useCommonUpdateApi({ getCourseModuleDetails });

	const { loading: deleteLoading, commonDeleteApi } = useCommonDeleteApi({
		finalData,
		getCourseModuleDetails,
		type: 'module',
	});

	const onSaveModule = ({ values }) => {
		if (module.isNew) {
			commonCreateApi({ values, type: 'module' });
		} else {
			commonUpdateApi({ values, type: 'module' });
		}
	};

	const onSubmit = (values) => {
		const { isNew = false, id: moduleId } = module || {};

		const payloadValues = getPayload({ values, course_id: id, isNew, nodeIndex, moduleId, payloadType: 'module' });

		onSaveModule({ values: payloadValues });
	};

	const hideEditComponent = () => {
		setShowModule((prev) => prev.filter((item) => item !== module.id));
	};

	const deleteModule = ({ id: deleteId, isNew = false, length }) => {
		if (length === 1) {
			Toast.error('cannot delete as there should be atleast one module');
			return;
		}

		if (isNew) {
			setFinalData((prev) => prev.filter((item) => item.id !== deleteId));
			return;
		}

		const deletePayloadValues = getPayload({
			course_id   : id,
			moduleId    : deleteId,
			payloadType : 'module',
			action_type : 'delete',
		});

		commonDeleteApi({ idToDelete: deleteId, deletePayloadValues });
	};

	useEffect(() => {
		if (!module.isNew) {
			setValue('name', module.name);
			setValue('description', module.description);
		}
	}, [module, setValue]);

	const moduleLoading = createModuleLoading || updateModuleLoading || getLoading;

	return {
		deleteModule,
		moduleLoading,
		handleSubmit,
		control,
		errors,
		onSubmit,
		hideEditComponent,
		showModule,
		setShowModule,
		deleteLoading,
	};
};

export default useHandleModule;
