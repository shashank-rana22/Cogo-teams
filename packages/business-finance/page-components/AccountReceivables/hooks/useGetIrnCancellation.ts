import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

interface IrnCancellationProps {
	id?: string;
	setShowCancellationModal?: Function;
	response?: {
		remarks?: string;
	},
	refetch?: Function;
}
interface Values {
	agreementNumber?: string;
	agreementDate?: string;
	agreementPdfFile?: AgreementPdfFile;
}

interface AgreementPdfFile {
	finalUrl?: string;
}

const useGetIrnCancellation = ({ id, setShowCancellationModal, response, refetch }: IrnCancellationProps) => {
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
		const {
			agreementNumber,
			agreementDate,
			agreementPdfFile,
		} = values || {};
		const { finalUrl } = agreementPdfFile || {};
		try {
			const payload = {
				cancelReason      : remarks || undefined,
				agreementNumber   : agreementNumber || undefined,
				agreementDate     : agreementDate || undefined,
				agreementDocument : finalUrl || undefined,
			};
			const resp = await cancelIrnApi({
				data: payload,
			});
			if (resp.status === 200) {
				Toast.success('IRN Cancelled Successfully');
				setShowCancellationModal(false);
			}
			refetch();
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
