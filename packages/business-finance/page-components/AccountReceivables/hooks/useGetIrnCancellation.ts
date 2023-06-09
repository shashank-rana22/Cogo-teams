import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

interface IrnCancellationProps {
	id?: string;
	setShowCancellationModal?: (p: boolean)=> void;
	response?: {
		remarks?: string;
	},
}
interface Values {
	Agreement_number?: string;
	Agreement_date?: string;
	Agreement_pdf_file?: AgreementPdfFile;
}

interface AgreementPdfFile {
	finalUrl?: string;
}

const useGetIrnCancellation = ({ id, setShowCancellationModal, response }: IrnCancellationProps) => {
	const [
		{ loading },
		cancelIrnApi,
	] = useRequestBf(
		{
			url     : `/sales/invoice/${id}/irn-cancel`,
			method  : 'post',
			authKey : 'post_sales_invoice_by_id_irn_cancel',
		},
		{ manual: true },
	);

	const { remarks } = response || {};
	
	const onSubmit = async (values: Values) => {
		const { Agreement_number, Agreement_date , Agreement_pdf_file } = values || {};
		const { finalUrl } = Agreement_pdf_file || {};
		try {
			const payload = {
				cancelReason      : remarks || undefined,
				agreementNumber   : Agreement_number || undefined,
				agreementDate     : Agreement_date || undefined,
				agreementDocument : finalUrl || undefined,
			};
			const resp = await cancelIrnApi({
				data: payload,
			});
			if (resp.status === 200) {
				Toast.success('IRN Cancelled Successfully');
				setShowCancellationModal(false);
			}
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	return {
		onSubmit,
		loading,
	};
};

export default useGetIrnCancellation;
