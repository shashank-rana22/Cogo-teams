import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

interface PartnerObject {
	id?: string
}
interface UploadInterface {
	id?: string,
	setUploadInvoice?: (p: boolean)=> void,
	partner?: PartnerObject
}

const useUploadeInvoice = ({ id, setUploadInvoice, partner }: UploadInterface) => {
	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/sales/invoice/einvoice',
			method  : 'post',
			authKey : 'post_sales_invoice_einvoice',
		},
		{ manual: true },
	);

	const uploadEInvoice = async (value) => {
		try {
			await trigger({
				data: {
					invoiceId           : id,
					invoiceDate         : value?.E_invoice_date,
					invoiceDueDate      : value?.E_invoice_due_date,
					eInvoiceNumber      : value?.E_invoice_number,
					eInvoicePdfUrl      : value?.E_invoice_pdf_file?.finalUrl,
					eInvoiceXmlUrl      : value?.E_invoice_xml_file?.finalUrl,
					updatedBy           : partner?.id,
					performedByUserType : 'agent',
				},
			});
			Toast.success('E-invoice Uploaded Successfully');
			setUploadInvoice(false);
		} catch (error) {
			Toast.error(
				error?.response?.data?.message || 'There was an error Uploading E-invoice',
			);
		}
	};

	return {
		uploadEInvoice,
		loading,
	};
};

export default useUploadeInvoice;
