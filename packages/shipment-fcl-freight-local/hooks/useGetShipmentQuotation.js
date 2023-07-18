import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useContext } from 'react';

const useGetShipmentQuotation = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [{ data }, trigger] = useRequest({
		url    : '/get_shipment_quotation',
		method : 'GET',
	});

	const getQuotation = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: { shipment_id: shipment_data.id },
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [shipment_data?.id, trigger]);

	useEffect(() => {
		getQuotation();
	}, [getQuotation]);

	return {
		quotationData: data,
	};
};

export default useGetShipmentQuotation;
