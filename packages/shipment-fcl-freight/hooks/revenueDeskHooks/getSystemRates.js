import { useEffect } from 'react';
import { useRequest } from '@cogoport/request';


const getServiceWiseFilters = (shipment_type, shipment_data, service) => {

	if (shipment_type === 'fcl_freight') {
		return {
			origin_port_id: shipment_data?.origin_port?.id,
			destination_port_id: shipment_data?.destination_port?.id,
			shipping_line_id: shipment_data?.shipping_line_id?.id,
			container_size: service?.container_size,
			container_type: service?.container_type,
			commodity: service?.commodity,
			is_rate_available: true,
		};
	}
	return {};
};

const getSystemRates = ({ shipment_data, choosen, shipment_type, service }) => {
	
	const api = `/list_${shipment_type}_rates`;

	 const [{data:data, loading: loading, error = error },trigger] = useRequest(api,{manual:true})

	const filters = getServiceWiseFilters(shipment_type, shipment_data, service);
	const availableFilters = {};
	Object.keys(filters).forEach((key) => {
		if (filters[key]) {
			availableFilters[key] = filters[key];
		}
	});

	const getList = async () => {
		await trigger({
			params: {
				filters: availableFilters,
				page_limit: 100,
				pagination_data_required: false,
			},
		});
	};

	useEffect(() => {
		if (choosen === 0) {
			getList();
		}
	}, [choosen]);

	return {
		loading,
		systemRatesData: data,
	};
};

export default getSystemRates;