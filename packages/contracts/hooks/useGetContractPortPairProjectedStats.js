import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetContractPortPairProjectedStats = ({ payload }) => {
	const [data, setData] = useState();

	const [{ error, loading }, trigger] = useRequest(
		{
			url    : '/get_contract_port_pair_projected_stats',
			method : 'GET',
		},
		{ manual: true },
	);

	const getPortPairStats = async () => {
		try {
			const res = await trigger({
				params: {
					contract_id              : payload?.id,
					contract_service_id      : payload?.contract_service_id,
					service_type             : payload?.service_type,
					origin_port_id           : payload?.origin_port_id || undefined,
					destination_port_id      : payload?.destination_port_id || undefined,
					requested_contract_price : parseInt(payload?.requested_contract_price, 10) || undefined,
					origin_airport_id        : payload?.origin_airport_id || undefined,
					destination_airport_id   : payload?.destination_airport_id || undefined,
				},
			});
			setData(res?.data);
		} catch (err) {
			// console.log(err);
		}
	};

	const getStats = !!payload?.id
    && !!payload?.contract_service_id
    && !!payload?.service_type
	&& !!payload?.requested_contract_price;

	useEffect(() => {
		if (getStats) {
			getPortPairStats();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getStats]);

	return {
		data,
		loading,
		error,
		getPortPairStats,
	};
};

export default useGetContractPortPairProjectedStats;
