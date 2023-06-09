import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useListCourseUserMappings({ user_id }) {
	const [{ data = {}, loading }, trigger] = useRequest({
		url    : '/list_user_courses',
		method : 'GET',
		params : {
			filters: {
				status: 'active',
				user_id,
			},
		},
	}, { manual: false });

	const fetchList = ({ course_category_id = '' }) => {
		try {
			trigger({
				params: {
					filters: {
						status       : 'active',
						user_id,
						course_category_id,
						course_state : 'published',
					},
				},
			});
		} catch (error) {
			Toast.error(error.message);
		}
	};

	return {
		data,
		loading,
		fetchList,
	};
}

export default useListCourseUserMappings;
