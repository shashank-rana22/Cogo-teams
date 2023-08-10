import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const useCreateCourse = ({ setErrors }) => {
	const router = useRouter();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_cogo_academy_course',
		method : 'POST',
	}, { manual: true });

	const createCourse = async ({ courseData = {} }) => {
		const { course_name, course_categories = [] } = courseData;

		if (isEmpty(course_categories)) {
			setErrors((prev) => ({ ...prev, course_categories: 'This is Required' }));
			return;
		}

		try {
			const res = await trigger({
				data: {
					name         : course_name,
					category_ids : course_categories,
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
