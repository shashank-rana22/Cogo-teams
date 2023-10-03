import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetWeightSlabs = () => {
	const [{ data: slabs_data }, trigger] = useRequest({
		url    : '/get_weight_slabs_for_airline',
		method : 'GET',
	}, { manual: true });

	const getWeightSlabs = useCallback(async (
		airlineId = '',
		chargeableWeight = undefined,
	) => {
		try {
			await trigger({
				params: {
					airline_id        : airlineId,
					chargeable_weight : chargeableWeight,
				},
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	useEffect(() => { getWeightSlabs(); }, [getWeightSlabs]);

	return { slabs_data, getWeightSlabs };
};

export default useGetWeightSlabs;
