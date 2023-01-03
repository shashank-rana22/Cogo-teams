import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateContract = () => {
	const [{ error, loading }, trigger] = useRequest({
		url    : '/update_contract',
		method : 'POST',
	}, { manual: true });
	const updateContract = async ({ payload }) => {
		try {
			const res = await trigger({

				data: {
					id               : payload?.id,
					pending_approval : payload?.status,
				},
			});
			if (res?.data) {
				Toast.success('Contract Updated');
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	return {
		loading,
		error,
		updateContract,
	};
};

export default useUpdateContract;
