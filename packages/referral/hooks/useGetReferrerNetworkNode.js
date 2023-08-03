import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetReferrerNetworkNode = ({ referee_id = '' }) => {
	const { query = {} } = useRouter();
	const { referrer_id = '' } = query;

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_referrer_network_node',
		method : 'get',
	}, { manual: true });

	const referrerNetworkNode = useCallback(async () => {
		try {
			await trigger({
				params: {
					selected_node_id: referee_id,
					referrer_id,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [referee_id, referrer_id, trigger]);

	useEffect(() => {
		referrerNetworkNode();
	}, [referrerNetworkNode]);

	return {
		referrerNetworkNode,
		data,
		loading,
	};
};

export default useGetReferrerNetworkNode;
