import { useRequest } from '@cogoport/request';

const useCreateSupplySearch = ({
	refetchListFclSearches,
	reset,
	setLocationDetails,
}) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url: '/create_rolling_fcl_freight_search',
			method: 'POST',
		},
		{ manual: true },
	);

	const createSupplySearch = async ({ payload }) => {
		try {
			await trigger({ data: payload });
			refetchListFclSearches();
			setLocationDetails({});
			reset();
		} catch (err) {
			console.error(err);
		}
	};
	return {
		data,
		createSupplySearch,
		createSearchLoadng: loading,
	};
};

export default useCreateSupplySearch;
