import { useEffect } from 'react';
import { useRequest } from '@cogoport/request';
import getPreviousFalshPayload from '../../utils/revenueDeskUtils/getPreviousFlashPayload';

const getFlashRates = ({
	api,
	currentShipmentData,
	choosen,
	shipment_type,
	service,
}) => {


	const [{data:data, loading: loading, error : error },trigger] = useRequest('/list_shipment_flash_booking_rates',{manual:true})
	const date = new Date();
	date.setDate(date.getDate() - 4);
	console.log(data,'naveen');
	const service_type = `${shipment_type}_service`;

	const { options } = getPreviousFalshPayload(currentShipmentData);
	const PreviousFlashFilters = {
		service_data: options,
		is_reverted: true,
		service_type,
		service_id: service?.id || undefined,
		created_at_greater_than: date,
		not_current_shipment: currentShipmentData?.id,
	};

	const CurrentFlashFilters = {
		shipment_id: currentShipmentData?.id,
		service_type,
		is_reverted: true,
		service_id: service?.id || undefined,
	};
	const filtersToCall =
		api === 'current' ? CurrentFlashFilters : PreviousFlashFilters;

	const getList = async () => {
		await trigger({
			params: {
				filters: filtersToCall,

				page_limit: 100,
			},
		});
	};

	useEffect(() => {
		if (choosen === 0) {
			getList();
		}
	}, [api, choosen]);

	return {
		loading,
		flashRatesData: data,
	};
};

export default getFlashRates;