import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useUploadeInvoice = ({ id, setUploadInvoice, partner }) => {
	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/sales/invoice/einvoice',
			method  : 'get',
			authKey : 'post_sales_invoice_einvoice',
		},
		{ manual: true },
	);

	const uploadEInvoice = async (value = {}) => {
		try {
			await trigger({
				data: {
					invoiceId           : id,
					invoiceDate         : value?.eInvoiceDate,
					invoiceDueDate      : value?.eInvoiceDueDate,
					eInvoiceNumber      : value?.eInvoiceNumber,
					eInvoicePdfUrl      : value?.uploadInvoiceFile?.url,
					eInvoiceXmlUrl      : value?.uploadXmlFile?.url,
					updatedBy           : partner?.id,
					performedByUserType : 'agent',
				},
			});
			Toast.success('E-invoice Uploaded Successfully');
			setUploadInvoice(false);
		} catch (error) {
			Toast.error(
				error?.error?.message || 'There was an error Uploading E-invoice',
			);
		}
	};

	return {
		uploadEInvoice,
		loading,
	};
};

export default useUploadeInvoice;
