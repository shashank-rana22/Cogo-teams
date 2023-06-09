import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCommonCreateApi from '../../../../../../hooks/useCommonCreateApi';
import useCommonUpdateApi from '../../../../../../hooks/useCommonUpdateApi';

const useHandleSubModule = ({
	getLoading,
	getCourseModuleDetails,
	module,
	id,
	course_module_id,
	showButtons,
}) => {
	const { course_sub_modules = [] } = module || {};

	const [courseSubModule, setCourseSubModule] = useState(course_sub_modules);

	const {
		commonCreateApi,
		loading: createSubModuleLoading,
	} = useCommonCreateApi({ getCourseModuleDetails });

	const {
		commonUpdateApi,
		loading: updateSubModuleLoading,
	} = useCommonUpdateApi({ getCourseModuleDetails });

	const onSaveSubModule = ({ values, subModule }) => {
		if (subModule.isNew) {
			commonCreateApi({ values, type: 'sub_module' });
		} else {
			commonUpdateApi({ values, type: 'sub_module' });
		}
	};

	const addNewCourseSubModule = () => {
		setCourseSubModule((prev) => [
			...prev,
			{
				id                         : new Date().getTime(),
				name                       : '',
				course_sub_module_chapters : [],
				isNew                      : true,
				course_module_id,
				cogo_academy_course_id     : id,
			},
		]);
	};

	if (isEmpty(courseSubModule) && showButtons) {
		setCourseSubModule([
			{
				id                         : new Date().getTime(),
				name                       : '',
				course_sub_module_chapters : [],
				isNew                      : true,
				course_module_id,
				cogo_academy_course_id     : id,
			},
		]);
	}

	useEffect(() => {
		setCourseSubModule(course_sub_modules);
	}, [course_sub_modules]);

	const subModuleLoading = createSubModuleLoading || updateSubModuleLoading || getLoading;

	return {
		onSaveSubModule,
		subModuleLoading,
		addNewCourseSubModule,
		courseSubModule,
		setCourseSubModule,
	};
};

export default useHandleSubModule;
