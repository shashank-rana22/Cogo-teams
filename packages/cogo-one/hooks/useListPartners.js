import { useRequest } from '@cogoport/request';

const useListPartners = () => {
	const [{ loading:partnersLoading, data }, trigger] = useRequest({
		url    : '/list_partners',
		method : 'get',
	}, { manual: true });

	const fetchPartnerId = async (payload) => {
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
	};
	const { list = [] } = data || {};
	const { id = '' } = list?.[0] || {};

	return {
		partnersLoading,
		fetchPartnerId,
		channelPartnerId: id,
	};
};
export default useListPartners;
