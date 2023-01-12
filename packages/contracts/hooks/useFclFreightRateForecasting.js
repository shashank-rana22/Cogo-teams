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
					// origin_port_id      : data?.origin_port_id,
					// destination_port_id : data?.destination_port_id,
					// container_size      : data?.container_size,
					// shipping_line_id    : data?.shipping_line_id,

					origin_port_id      : 'eb187b38-51b2-4a5e-9f3c-978033ca1ddf',
					destination_port_id : '0c7cc4a0-3449-4446-92ee-b44ee8019e4b',
					container_size      : '40HC',
					shipping_line_id    : 'fb1aa2f1-d136-4f26-ad8f-2e1545cc772a',
				},

			});
		} catch (err) {
			console.log(err);
		}
	};

	const callForecast = data?.origin_port_id
    && data?.destination_port_id
    && data?.container_size
     && data?.shipping_line_id;

	useEffect(() => {
		// if (callForecast) {
		getForecast();
		// }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data: predictedRateApi?.data,
		getForecast,
	};
};

export default useFclFreightRateForecasting;
