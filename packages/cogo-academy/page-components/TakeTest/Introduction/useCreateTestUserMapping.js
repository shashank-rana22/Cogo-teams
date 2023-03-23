import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';

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
		console.log('data', start_time);
		try {
			const payload = {
				test_id,
				user_id,
				start_time: format(start_time),
			};

			console.log(payload, 'payload');

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
