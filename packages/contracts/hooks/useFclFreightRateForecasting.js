import useAxios from 'axios-hooks';
import { useEffect } from 'react';

const useFclFreightRateForecasting = ({ data = {} }) => {
	const [predictedRateApi, triggerForecaset] = useAxios(
		{
			url    : `${process.env.NEXT_PUBLIC_COGO_LENS_URL}/fcl_freight_rate_forecasting`,
			method : 'POST',
		},
		{ manual: true },
	);
	const getForecast = async () => {
		try {
			await triggerForecaset({
				data: {
					shipping_line_id    : data?.shipping_line_id,
					origin_port_id      : data?.origin_port_id,
					destination_port_id : data?.destination_port_id,
					container_size      : data?.container_size,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	const callForecast = data?.origin_port_id
	&& data?.destination_port_id
	&& data?.container_size
	&& data?.shipping_line_id
	&& data?.service_type === 'fcl_freight';

	useEffect(() => {
		if (callForecast) {
			getForecast();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data: predictedRateApi?.data,
		getForecast,
	};
};

export default useFclFreightRateForecasting;
