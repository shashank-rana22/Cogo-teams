import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

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
