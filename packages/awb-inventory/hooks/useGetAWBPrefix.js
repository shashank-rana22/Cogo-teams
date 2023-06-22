import { useRequest } from '@cogoport/request';

const useGetAWBPrefix = () => {
	const [{ data, loading }, trigger] = useRequest('/get_airwaybill_prefix_from_airline', { manual: true });

	const getAWBPrefix = async (airline_id) => {
		try {
			await trigger({
				params: {
					airline_id,
				},
			});
		} catch (error) {
			console.error(error);
		}
	};
	return { loading, data, getAWBPrefix };
};
export default useGetAWBPrefix;
