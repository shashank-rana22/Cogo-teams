import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const useCreateSupplySearch = ({
	refetchListFclSearches,
	reset,
	setLocationDetails,
}) => {
	const router = useRouter();

	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/create_rolling_fcl_freight_search',
			method : 'POST',
		},
		{ manual: true },
	);

	const createSupplySearch = async ({ payload }) => {
		try {
			const res = await trigger({ data: payload });

			refetchListFclSearches();

			const searchId = res?.data?.id;

			if (searchId) { router.push(`/supply-allocation/view/${searchId}`); }

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
