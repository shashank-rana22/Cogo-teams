import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateContractService = ({ getContract, getContractStats }) => {
	const [{ error, loading }, trigger] = useRequest(
		{
			url    : '/update_contract_service',
			method : 'POST',
		},
		{ manual: true },
	);
	const updateContractService = async ({ payload }) => {
		try {
			const res = await trigger({
				data: {
					contract_service_id : payload?.id,
					service_type        : payload?.service_type,
					status              : payload?.status || undefined,
					service_provider_id : payload?.service_provider_id || undefined,
				},
			});
			if (res?.data) {
				Toast.success('Contract Updated');
				getContract();
				getContractStats();
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	return {
		loading,
		error,
		updateContractService,
	};
};

export default useUpdateContractService;
