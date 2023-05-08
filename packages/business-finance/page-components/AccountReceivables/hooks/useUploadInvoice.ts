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
	const { id: partnerId = '' } = partner || {};
	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/sales/invoice/einvoice',
			method  : 'post',
			authKey : 'post_sales_invoice_einvoice',
		},
		{ manual: true },
	);

	const uploadEInvoice = async (value) => {
		const {
			E_invoice_date : E_INVOICE_DATE = '',
			E_invoice_due_date : E_INVOICE_DUE_DATE = '', E_invoice_number : E_INVOICE_NUMBER = '',
			E_invoice_pdf_file : E_INVOICE_PDF_FILE = '', E_invoice_xml_file : E_INVOICE_XML_FILE = '',
		} = value || {};

		const { finalUrl : FINAL_URL_PDF = '' } = E_INVOICE_PDF_FILE;
		const { finalUrl : FINAL_URL_XML = '' } = E_INVOICE_XML_FILE;

		try {
			await trigger({
				data: {
					invoiceId           : id,
					invoiceDate         : E_INVOICE_DATE || undefined,
					invoiceDueDate      : E_INVOICE_DUE_DATE || undefined,
					eInvoiceNumber      : E_INVOICE_NUMBER || undefined,
					eInvoicePdfUrl      : FINAL_URL_PDF || undefined,
					eInvoiceXmlUrl      : FINAL_URL_XML || undefined,
					updatedBy           : partnerId,
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
