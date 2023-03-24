import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateTestUserMapping = () => {
	const {
		profile: { user: { id:user_id = '' } },
		general: { query: { test_id = '' } },
	} = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_test_user_mapping',
	}, { manual: true });

	const passStartTime = async () => {
		const start_time = new Date();
		try {
			const payload = {
				test_id,
				user_id,
				start_time,
			};

			await trigger({
				data: payload,
			});
		} catch (err) {
			console.log('error', err);
		}
	};

	return {
		loading,
		passStartTime,
	};
};

export default useCreateTestUserMapping;
