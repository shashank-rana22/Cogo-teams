import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useListCourseCategory = () => {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const [{ data = {}, loading }] = useRequest({
		url    : '/list_course_categories',
		method : 'GET',
		params : {
			filters              : { user_id },
			topics_data_required : true,
		},
	}, { manual: false });

	const { list = [] } = data;

	const finalCourseCategories = [
		{
			display_name       : 'All Courses',
			name               : 'all_courses',
			id                 : 'all_courses', // new Date().getTime(),
			is_course_category : false,
		},
		...(list || []),
	];

	return {
		loading,
		courseCategoryData: data,
		finalCourseCategories,
	};
};

export default useListCourseCategory;
