import { useRequest } from '@cogoport/request';

const useGetVarience = () => {
	const [{ data: varianceFullData }, trigger] = useRequest({
		url    : '/get_collection_party_variance',
		method : 'post',
	}, { manual: true });

	return { varianceFullData, trigger };
};

export default useGetVarience;
