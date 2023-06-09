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
	AgreementNumber?: string;
	AgreementDate?: string;
	AgreementPdfFile?: AgreementPdfFile;
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
		const { AgreementNumber, AgreementDate, AgreementPdfFile } = values || {};
		const { finalUrl } = AgreementPdfFile || {};
		try {
			const payload = {
				cancelReason     : remarks || undefined,
				agreementNumber  : AgreementNumber || undefined,
				agreementDate    : AgreementDate || undefined,
				agrDmentDocument : finalUrl || undefined,
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
