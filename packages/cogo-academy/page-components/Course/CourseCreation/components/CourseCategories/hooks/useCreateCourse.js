import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const useCreateCourse = () => {
	const router = useRouter();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_cogo_academy_course',
		method : 'POST',
	}, { manual: true });

	const createCourse = async ({ courseData = {} }) => {
		try {
			const res = await trigger({
				data: {
					name         : courseData.course_name,
					category_ids : courseData.course_categories,
				},
			});

			const { id } = res.data || {};
			router.push(
				`/learning/course/create?id=${id}`,
				`/learning/course/create?id=${id}`,
			);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createCourse,
		loading,
	};
};

export default useCreateCourse;
