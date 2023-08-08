import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const groupByRegistrationNum = (invoices) => {
	const GROUP_BY_ORG_INVOICES = {};
	(invoices || []).forEach((invoice) => {
		const key = invoice?.billing_address?.registration_number;
		GROUP_BY_ORG_INVOICES[key] = {
			invoices      : [...(GROUP_BY_ORG_INVOICES[key]?.invoices || []), invoice],
			business_name : invoice?.billing_address?.business_name,
			name          : invoice?.billing_address?.name,
		};
	});
	return GROUP_BY_ORG_INVOICES;
};

const useGetInvoicingPartyData = ({ data, open }) => {
	const [{ data: invoiceData, loading: invoiceLoading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_shipment_invoice_preference',
	}, { manual: true });

	const shipmentId = data?.id || undefined;
	const performedByOrgId = data?.importer_exporter_id || undefined;

	const getData = useCallback(async () => {
		await trigger({
			params: {
				shipment_id         : shipmentId,
				performed_by_org_id : performedByOrgId,
			},
		});
	}, [trigger, shipmentId, performedByOrgId]);

	const groupedInvoices = groupByRegistrationNum(
		invoiceData?.invoicing_parties || [],
	);

	useEffect(() => {
		if (!isEmpty(data) && data?.importer_exporter_id && open) {
			getData();
		}
	}, [getData, data, open]);

	return {
		invoiceLoading,
		invoiceData,
		groupedInvoices,
		refetch: getData,
	};
};

export default useGetInvoicingPartyData;
