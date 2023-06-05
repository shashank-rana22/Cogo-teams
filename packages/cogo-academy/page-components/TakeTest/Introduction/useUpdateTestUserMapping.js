import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateTestUserMapping = () => {
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

	const passStartTime = async () => {
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
		} catch (err) {
			Toast.error(err.response?.data);
		}
	};

	return {
		loading,
		passStartTime,
	};
};

export default useUpdateTestUserMapping;
