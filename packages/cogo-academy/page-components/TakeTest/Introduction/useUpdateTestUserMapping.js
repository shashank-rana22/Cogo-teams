import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const DEFAULT_VISIBILITY_COUNT = 1;

const useUpdateTestUserMapping = ({ setActiveState }) => {
	const {
		query: { test_id },
		user: { id: user_id },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_test_user_mapping',
	}, { manual: true });

	const handleStartExam = async () => {
		const start_time = new Date();

		try {
			const payload = {
				test_id,
				user_id,
				start_time,
				state: 'ongoing',
			};

			await trigger({
				data: payload,
			});

			setActiveState('ongoing');
			localStorage.setItem('visibilityChangeCount', DEFAULT_VISIBILITY_COUNT);

			// const elem = document.getElementById('maincontainer');

			// if (elem?.requestFullscreen) {
			// 	elem?.requestFullscreen();
			// } else if (elem?.webkitRequestFullscreen) { /* Safari */
			// 	elem?.webkitRequestFullscreen();
			// } else if (elem?.msRequestFullscreen) { /* IE11 */
			// 	elem?.msRequestFullscreen();
			// }
		} catch (err) {
			Toast.error(err.response?.data);
		}
	};

	return {
		loading,
		handleStartExam,
	};
};

export default useUpdateTestUserMapping;
