import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreateCourseSubModule from '../../../../../../hooks/useCreateCourseSubModule';
import useUpdateCourseSubModule from '../../../../../../hooks/useUpdateCourseSubModule';

const useHandleSubModule = ({
	getLoading,
	getCourseModuleDetails,
	module,
	id,
	course_module_id,
}) => {
	const { course_sub_modules = [] } = module || {};

	const [courseSubModule, setCourseSubModule] = useState(course_sub_modules);

	const {
		createCourseSubModule,
		loading: createSubModuleLoading,
	} = useCreateCourseSubModule({ getCourseModuleDetails });

	const {
		updateCourseSubModule,
		loading: updateSubModuleLoading,
	} = useUpdateCourseSubModule({ getCourseModuleDetails });

	const onSaveSubModule = ({ values, subModule }) => {
		if (subModule.isNew) {
			createCourseSubModule({ values });
		} else {
			updateCourseSubModule({ values });
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

	if (isEmpty(courseSubModule)) {
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
