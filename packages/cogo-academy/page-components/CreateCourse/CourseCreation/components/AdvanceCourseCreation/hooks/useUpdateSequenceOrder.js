import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateSequenceOrder = ({ getCourseModuleDetails, setGetSubModuleRefetch = () => {} }) => {
	const [{ loading: loadingModule }, triggerModule] = useRequest({
		method : 'post',
		url    : '/update_course_module_sequence_order',
	}, { manual: true });

	const [{ loading: loadingSubModule }, triggerSubModule] = useRequest({
		method : 'post',
		url    : '/update_course_sub_module_sequence_order',
	}, { manual: true });

	const [{ loading: loadingChapter }, triggerChapter] = useRequest({
		method : 'post',
		url    : '/update_chapter_sequence_order',
	}, { manual: true });

	const TRIGGER_MAPPING = {
		module     : triggerModule,
		sub_module : triggerSubModule,
		chapter   	: triggerChapter,
	};

	const updateSequenceOrder = async ({ values, type = '' }) => {
		try {
			const triggerToUse = TRIGGER_MAPPING[type];

			await triggerToUse({ data: values });

			if (type === 'chapter') {
				setGetSubModuleRefetch(true);
				return;
			}

			await getCourseModuleDetails();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		updateSequenceOrder,
		loading: loadingModule || loadingSubModule || loadingChapter,
	};
};

export default useUpdateSequenceOrder;
