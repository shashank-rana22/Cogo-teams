import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useContext } from 'react';

const groupByRegistrationNum = (invoices) => {
	const GROUP_BY_ORG_INVOICES = {};
	(invoices || []).forEach((invoice) => {
		const key = invoice.billing_address?.registration_number;
		GROUP_BY_ORG_INVOICES[key] = {
			invoices      : [...(GROUP_BY_ORG_INVOICES[key]?.invoices || []), invoice],
			business_name : invoice?.billing_address?.business_name,
			name          : invoice?.billing_address?.name,
		};
	});
	return GROUP_BY_ORG_INVOICES;
};

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
