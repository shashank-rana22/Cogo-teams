import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useShipmentBuyQuotations = ({
	shipment_id,
	service_id,
	source,
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_quotation',
		method : 'get',
	}, { manual: true });

	const getCharges = useCallback(async () => {
		try {
			await trigger({
				params: {
					shipment_id,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [shipment_id, trigger]);

	useEffect(() => {
		if (source === 'live_booking') { getCharges(); }
	}, [getCharges, source]);

	const service_charges = (
		data?.service_charges || []
	).filter((quotation) => service_id === quotation.service_id);

	const line_items = service_charges[GLOBAL_CONSTANTS.zeroth_index]?.line_items || [];

	return { line_items, loading };
};

export default useShipmentBuyQuotations;
