import { useEffect } from 'react';
import { useRequest } from '@cogoport/request';

const getExistingRates = ({
	api,
	currentShipmentData,
	choosen,
	shipment_type,
}) => {

	const [{data:data, loading: loading, error = error },trigger]=useRequest('/get_shipment_elligible_booking_document',{manual:true})

	const getList = async () => {
		await trigger({
			params: {
				shipment_id: currentShipmentData?.id,
				page_limit: 100,
			},
		});
	};

	useEffect(() => {
		if (choosen === 0 && shipment_type === 'fcl_freight') {
			getList();
		}
	}, [api, choosen]);

	return {
		existingDataLoading: loading,
		existingData: data,
	};
};

export default getExistingRates;