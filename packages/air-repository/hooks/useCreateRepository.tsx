import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateRepository = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_service_ops_repository',
		method : 'POST',
	});

	const createRepository = async (payload, listRepository) => {
		try {
			await trigger({
				data: payload,
			});
			listRepository();
			Toast.success('Repository Created Successfully');
		} catch (err) {
			console.log('err', err);

			Toast.error(err?.response?.data?.base || err?.message || 'Failed to Upload');
		}
	};

	return {
		createRepository,
		loading,
	};
};
export default useCreateRepository;
