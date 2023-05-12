import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

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

const useGetShipmentInvoice = ({ payload }) => {
	const [{ loading, data: invoiceData }, trigger] = useRequest({
		url    : '/get_shipment_invoice_preference',
		method : 'GET',
	}, { manual: true });

	const getInvoiceInfo = async () => {
		try {
			await trigger({ params: payload });
		} catch (error) {
			toastApiError(error?.data);
		}
	};

	const groupedInvoices = groupByRegistrationNum(
		invoiceData?.invoicing_parties || [],
	);

	useEffect(() => {
		getInvoiceInfo();
	}, []);

	return { loading, data: invoiceData || {}, refetch: getInvoiceInfo, groupedInvoices };
};

export default useGetShipmentInvoice;
