import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useContext } from 'react';

import { groupByRegistrationNum } from '../utils/groupByRegistrationNum';

const useGetShipmentCrossEntityInvoice = () => {
	const {
		shipment_data :{
			id :shipment_id = '',
		} = {},
	} = useContext(ShipmentDetailContext);

	const [{ loading, data: invoiceData }, trigger] = useRequest({
		url    : '/get_shipment_cross_entity_invoice',
		method : 'GET',

	}, { manual: true });

	const getInvoiceInfo = useCallback(async () => {
		try {
			await trigger({
				params: {
					shipment_id,
					type: 'sell',
				},

			});
		} catch (error) {
			toastApiError(error?.data);
		}
	}, [shipment_id, trigger]);

	const groupedInvoices = groupByRegistrationNum(
		invoiceData?.invoicing_parties || [],
	);

	useEffect(() => {
		getInvoiceInfo();
	}, [getInvoiceInfo]);

	return {
		loading,
		data    : invoiceData || {},
		refetch : getInvoiceInfo,
		groupedInvoices,
	};
};

export default useGetShipmentCrossEntityInvoice;
