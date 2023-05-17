import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCommonUpdateApi = ({ getCourseModuleDetails, getCourseSubModule }) => {
	const [{ loading: loadingModule }, triggerModule] = useRequest({
		method : 'post',
		url    : '/update_course_module',
	}, { manual: true });

	const [{ loading: loadingSubModule }, triggerSubModule] = useRequest({
		method : 'post',
		url    : '/update_course_sub_module',
	}, { manual: true });

	const [{ loading: loadingChapter }, triggerChapter] = useRequest({
		method : 'post',
		url    : '/update_course_sub_module_chapter',
	}, { manual: true });

	const MAPPING = {
		module     : { trigger: triggerModule, refetchApi: getCourseModuleDetails },
		sub_module : { trigger: triggerSubModule, refetchApi: getCourseModuleDetails },
		chapter   	: { trigger: triggerChapter, refetchApi: getCourseSubModule },
	};

	const commonUpdateApi = async ({ values, type }) => {
		const { trigger:triggerToUse, refetchApi } = MAPPING[type];

		try {
			await triggerToUse({ data: values });

			await refetchApi();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		commonUpdateApi,
		loaing: loadingChapter || loadingSubModule || loadingModule,
	};
};

export default useCommonUpdateApi;
