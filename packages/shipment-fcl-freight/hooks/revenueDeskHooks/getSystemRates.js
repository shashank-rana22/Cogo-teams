import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const getServiceWiseFilters = (shipment_data, service) => ({
	origin_port_id      : shipment_data?.origin_port?.id,
	destination_port_id : shipment_data?.destination_port?.id,
	shipping_line_id    : shipment_data?.shipping_line_id?.id,
	container_size      : service?.container_size,
	container_type      : service?.container_type,
	commodity           : service?.commodity,
	is_rate_available   : true,
});

const useGetSystemRates = ({
	shipment_data, choosen, service,
}) => {
	const api = '/list_fcl_freight_rates';

	const [{ data, loading }, trigger] = useRequest(api, { manual: true });

	const filters = getServiceWiseFilters(shipment_data, service);

	const availableFilters = {};

	Object.keys(filters).forEach((key) => {
		if (filters[key]) {
			availableFilters[key] = filters[key];
		}
	});

	const getList = async () => {
		try {
			await trigger({
				params: {
					filters                  : availableFilters,
					page_limit               : 100,
					pagination_data_required : false,
				},
			});
		} catch (err) {
			Toast.error('Something Went Wrong');
		}
	};

	useEffect(() => {
		if (choosen === 0) {
			getList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [choosen]);

	return {
		loading,
		systemRatesData: data,
	};
};

export default useGetSystemRates;
