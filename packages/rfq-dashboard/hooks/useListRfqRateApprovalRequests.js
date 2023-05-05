import { useRequest } from '@cogoport/request';

const useListRfqRateApprovalRequests = () => {
	const [{ error, loading, data }, trigger] = useRequest({
		url    : '/list_rfq_rate_approval_requests',
		method : 'GET',
	}, { manual: true });
	const getContract = async () => {
		try {
			await trigger();
		} catch (err) {
			// console.log(err);
		}
	};

	return {
		data: data || {},
		loading,
		error,
		getContract,
	};
};

export default useListRfqRateApprovalRequests;
