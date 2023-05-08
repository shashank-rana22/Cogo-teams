import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useGetReferrerNetworkNode = ({ referee_id = '' }) => {
	const { ...profile } = useSelector((state) => state?.profile);

	const user_id = profile?.user?.id;

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_referrer_network_node',
		method : 'get',
	}, { manual: true });

	const referrerNetworkNode = useCallback(async () => {
		try {
			await trigger({
				params: {
					selected_node_id : referee_id,
					referrer_id      : user_id,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [referee_id, trigger, user_id]);

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
