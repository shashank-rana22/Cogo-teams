import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useListPartners = () => {
	const [{ loading:partnersLoading, data }, trigger] = useRequest({
		url    : '/list_partners',
		method : 'get',
	}, { manual: true });

	const fetchPartnerId = useCallback(async (payload) => {
		try {
			await trigger({
				params: {
					filters: {
						...payload,
					},
				},
			});
		} catch (error) {
			// console.log("error:", error)

		}
	}, [trigger]);

	const { list = [] } = data || {};
	const { id = '' } = list?.[0] || {};

	return {
		partnersLoading,
		fetchPartnerId,
		channelPartnerId: id,
	};
};
export default useListPartners;
