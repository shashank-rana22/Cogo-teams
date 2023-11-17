import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const groupByRegistrationNum = (invoices) => {
	const GROUP_BY_ORG_INVOICES = {};
	(invoices || []).forEach((invoice) => {
		const key = invoice?.buy_address?.registration_number;
		GROUP_BY_ORG_INVOICES[key] = {
			invoices      : [...(GROUP_BY_ORG_INVOICES[key]?.invoices || []), invoice],
			business_name : invoice?.buy_address?.business_name,
			name          : invoice?.buy_address?.name,
		};
	});
	return GROUP_BY_ORG_INVOICES;
};

const useGetShipmentCrossEntityInvoice = ({ shipment_id = '', shipment_type = '' }) => {
	const [{ loading, data: invoiceData }, trigger] = useRequest({
		url    : '/get_shipment_cross_entity_invoice',
		method : 'GET',
	}, { manual: true });

	const getInvoiceInfo = useCallback(async () => {
		try {
			await trigger({
				params: {
					shipment_id,
					type: 'buy',
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
		if (shipment_type === 'fcl_freight') { getInvoiceInfo(); }
	}, [getInvoiceInfo, shipment_type]);

	return { loading, data: invoiceData || {}, refetch: getInvoiceInfo, groupedInvoices };
};

export default useGetShipmentCrossEntityInvoice;
