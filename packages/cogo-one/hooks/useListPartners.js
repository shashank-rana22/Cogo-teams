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
	const { id = '' } = data || {};
	return {
		partnersLoading,
		fetchPartnerId,
		channelPartnerId: id,
	};
};
export default useListPartners;
