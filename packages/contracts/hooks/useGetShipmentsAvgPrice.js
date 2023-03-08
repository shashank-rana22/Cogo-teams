import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetShipmentsAvgPrice = ({ payload }) => {
	const [data, setData] = useState();

	const [{ error, loading }, trigger] = useRequest(
		{
			url    : '/get_shipments_avg_price',
			method : 'GET',
		},
		{ manual: true },
	);

	const getPortPairStats = async () => {
		try {
			const res = await trigger({
				params: {
					service_type           : payload?.service_type,
					container_size         : payload?.container_size || undefined,
					origin_port_id         : payload?.origin_port_id || undefined,
					origin_airport_id      : payload?.origin_airport_id || undefined,
					destination_port_id    : payload?.destination_port_id || undefined,
					destination_airport_id : payload?.destination_airport_id || undefined,
					shipping_line_id       : payload?.shipping_line_id || undefined,
					airline_id             : payload?.airline_id || undefined,
					weight                 : parseInt(payload?.weight, 10) || undefined,
					volume                 : parseInt(payload?.volume, 10) || undefined,

				},
			});
			setData(res?.data);
		} catch (err) {
			// console.log(err);
		}
	};

	useEffect(() => {
		if (payload?.service_type) {
			getPortPairStats();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [payload?.service_type]);

	return {
		data,
		loading,
		error,
		getPortPairStats,
	};
};

export default useGetShipmentsAvgPrice;
