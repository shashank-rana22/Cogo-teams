import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

const groupByRegistrationNum = (invoices) => {
	const groupByOrgInvoices = {};
	(invoices || []).forEach((invoice) => {
		const key = invoice?.billing_address?.registration_number;
		groupByOrgInvoices[key] = {
			invoices      : [...(groupByOrgInvoices[key]?.invoices || []), invoice],
			business_name : invoice?.billing_address?.business_name,
			name          : invoice?.billing_address?.name,
		};
	});
	return groupByOrgInvoices;
};

const useGetInvoicingPartyData = ({ data, open }) => {
	const [{ data: invoiceData, loading: invoiceLoading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_shipment_invoice_preference',
	}, { manual: true });

	const getData = async () => {
		await trigger({
			params: {
				shipment_id         : data?.id || undefined,
				performed_by_org_id : data?.importer_exporter_id || undefined,
			},
		});
	};

	const groupedInvoices = groupByRegistrationNum(
		invoiceData?.invoicing_parties || [],
	);

	useEffect(() => {
		if (!isEmpty(data) && data?.importer_exporter_id) {
			getData();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(data)]);

	return {
		invoiceLoading,
		invoiceData,
		groupedInvoices,
		refetch: getData,
	};
};

export default useGetInvoicingPartyData;
