import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useContext } from 'react';

import { groupByRegistrationNum } from '../utils/groupByRegistrationNum';

const useGetShipmentInvoice = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { importer_exporter_id: performed_by_org_id = '', id: shipment_id = '' } = shipment_data || {};

	const [{ loading, data: invoiceData }, trigger] = useRequest({
		url    : '/get_shipment_invoice_preference',
		method : 'GET',
	}, { manual: true });

	const getInvoiceInfo = useCallback(async () => {
		try {
			await trigger({
				params: {
					shipment_id,
					performed_by_org_id,
				},
			});
		} catch (error) {
			toastApiError(error?.data);
		}
	}, [performed_by_org_id, shipment_id, trigger]);

	const groupedInvoices = groupByRegistrationNum(
		invoiceData?.invoicing_parties || [],
	);

	useEffect(() => {
		getInvoiceInfo();
	}, [getInvoiceInfo]);

	return { loading, data: invoiceData || {}, refetch: getInvoiceInfo, groupedInvoices };
};

export default useGetShipmentInvoice;
