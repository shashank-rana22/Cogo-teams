import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useListCourseCategory = () => {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const [{ data = {}, loading }] = useRequest({
		url    : '/list_course_categories',
		method : 'GET',
		params : { filters: { user_id } },
	}, { manual: false });

	const { list = [] } = data;

	const finalCourseCategories = [
		{
			display_name       : 'All Courses',
			name               : 'all_courses',
			id                 : new Date().getTime(),
			is_course_category : false,
		},
		...(list || []),
	];

	return {
		loading,
		finalCourseCategories,
	};
};

export default useListCourseCategory;
