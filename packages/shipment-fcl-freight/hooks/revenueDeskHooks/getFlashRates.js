import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

import getPreviousFalshPayload from '../../utils/revenueDeskUtils/getPreviousFlashPayload';

const useGetFlashRates = ({
	api,
	currentShipmentData,
	choosen,
	shipment_type,
	service,
}) => {
	const [{ data, loading }, trigger] = useRequest(
		'/list_shipment_flash_booking_rates',
		{ manual: true },
	);

	const date = new Date();
	date.setDate(date.getDate() - 4);

	const service_type = `${shipment_type}_service`;

	const { options } = getPreviousFalshPayload(currentShipmentData);

	const PreviousFlashFilters = {
		service_data            : options,
		is_reverted             : true,
		service_type,
		service_id              : service?.id || undefined,
		created_at_greater_than : date,
		not_current_shipment    : currentShipmentData?.id,
	};

	const CurrentFlashFilters = {
		shipment_id : currentShipmentData?.id,
		service_type,
		is_reverted : true,
		service_id  : service?.id || undefined,
	};

	const filtersToCall = api === 'current' ? CurrentFlashFilters : PreviousFlashFilters;

	const getList = async () => {
		try {
			await trigger({
				params: {
					filters    : filtersToCall,
					page_limit : 100,
				},
			});
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	useEffect(() => {
		if (choosen === 0) {
			getList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [api, choosen]);

	return {
		loading,
		flashRatesData: data,
	};
};

export default useGetFlashRates;
