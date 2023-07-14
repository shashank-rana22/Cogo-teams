import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const useUpdateContract = () => {
	const router = useRouter();
	const [{ error, loading }, trigger] = useRequest({
		url    : '/update_contract',
		method : 'POST',
	}, { manual: true });
	const updateContract = async ({ payload }) => {
		try {
			const res = await trigger({

				data: {
					id          : payload?.id,
					status      : payload?.status,
					is_approved : true,
				},
			});
			if (res?.data) {
				Toast.success('Contract Updated');
				router.push('/contracts');
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
