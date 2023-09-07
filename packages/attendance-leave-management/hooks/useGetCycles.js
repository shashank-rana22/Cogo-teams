import { useHarbourRequest } from '@cogoport/request';
import { useMemo } from 'react';

const useGetCycles = () => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_cycle_ids',
	}, { manual: false });

	const { cycles } = data || {};

	const formattedData = useMemo(
		() => {
			const formattedCycles = (cycles || []).map((val) => ({
				label : `${val.month} ${val.year}`,
				value : `${val.cycle_id}`,
			}));
			return formattedCycles;
		},
		[cycles],
	);

	return { loading, formattedData };
};

export default useGetCycles;
