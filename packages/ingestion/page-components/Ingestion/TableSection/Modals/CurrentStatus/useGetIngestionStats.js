import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useGetIngestionStats = ({ row = {} }) => {
	const { id = '' } = row || {};
	const [{ data, loading, error }, trigger] = useRequest(
		{
			url    : 'get_ingestion_stats',
			method : 'GET',
			params : { id },
		},
		{
			manual: false,

		},
	);

	if (error?.response?.data) {
		Toast.error(getApiErrorString(error?.response?.data));
	}

	const refetch = () => {
		trigger({
			params: { id },
		});
	};

	return {
		loading,
		data,
		refetchCurrentStatus : refetch,
		apiErrors            : error,
	};
};

export default useGetIngestionStats;
