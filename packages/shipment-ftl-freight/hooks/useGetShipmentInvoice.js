import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

const groupByRegistrationNum = (invoices) => {
	const groupByOrgInvoices = {};
	(invoices || []).forEach((invoice) => {
		const key = invoice.billing_address?.registration_number;
		groupByOrgInvoices[key] = {
			invoices      : [...(groupByOrgInvoices[key]?.invoices || []), invoice],
			business_name : invoice?.billing_address?.business_name,
			name          : invoice?.billing_address?.name,
		};
	});
	return groupByOrgInvoices;
};

const useGetShipmentInvoice = () => {
	const router = useRouter();
	const { shipment_id } = router.query;
	const [{ loading, data: invoiceData }, trigger] = useRequest({
		url    : '/get_shipment_invoice_preference',
		method : 'GET',
	}, { manual: true });

	const getInvoiceInfo = useCallback(async () => {
		try {
			await trigger({
				params: {
					shipment_id,
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

	return { loading, data: invoiceData || {}, refetch: getInvoiceInfo, groupedInvoices };
};

export default useGetShipmentInvoice;
