import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import getDeleteSequenceOrderPayload from '../utils/getDeleteSequenceOrderPayload';

const URL_MAPPING = {
	module: {
		deleteUrl : 'update_course_module',
		orderUrl  : 'update_course_module_sequence_order',
		key_name  : 'course_modules',
	},
	sub_module: {
		deleteUrl : 'update_course_sub_module',
		orderUrl  : 'update_course_sub_module_sequence_order',
		key_name  : 'course_sub_modules',
	},
	chapter: {
		deleteUrl : 'update_course_sub_module_chapter',
		orderUrl  : 'update_chapter_sequence_order',
		key_name  : 'chapters',
	},
};

const useCommonDeleteApi = ({ getCourseModuleDetails, getCourseSubModule, type, finalData }) => {
	const { deleteUrl, orderUrl, key_name } = URL_MAPPING[type];

	const [{ loading: deleteLoading }, triggerDelete] = useRequest({
		method : 'post',
		url    : deleteUrl,
	}, { manual: true });

	const [{ loading: orderLoading }, triggerOrder] = useRequest({
		method : 'post',
		url    : orderUrl,
	}, { manual: true });

	const refetchApiMapping = {
		module     : getCourseModuleDetails,
		sub_module : getCourseModuleDetails,
		chapter    : getCourseSubModule,
	};

	const filteredIds = finalData.filter((item) => !item.isNew).map((item) => item.id);

	const refetchApi = refetchApiMapping[type];

	const commonDeleteApi = async ({ idToDelete, deletePayloadValues }) => {
		try {
			await triggerDelete({ data: deletePayloadValues });

			const sequenceOrderPayload = getDeleteSequenceOrderPayload({ idToDelete, filteredIds });

			await triggerOrder({ data: { [key_name]: sequenceOrderPayload } });

			refetchApi();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		commonDeleteApi,
		loading: deleteLoading || orderLoading,
	};
};

export default useCommonDeleteApi;
