import { useRequest } from '@cogoport/request';

function useGetHandlingFee({ id = '' }) {
	const [{ data, loading = false }] = useRequest({
		url    : '/get_handling_fee_configuration',
		method : 'GET',
		params : {
			id,
			status: 'active',
		},
	}, { manual: false });

	return {
		data,
		loading,
	};
}

export default useGetHandlingFee;
