import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useShipmentBuyQuotations = ({
	shipment_id,
	service_id,
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_quotation',
		method : 'get',
	}, { manual: true });

	const getCharges = async () => {
		try {
			await trigger({
				params: {
					shipment_id,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	useEffect(() => {
		getCharges();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const service_charges = (
		data?.service_charges || []
	).filter((quotation) => service_id === quotation.service_id);

	const line_items = service_charges[GLOBAL_CONSTANTS.zeroth_index]?.line_items || [];

	return { line_items, loading };
};

export default useShipmentBuyQuotations;
