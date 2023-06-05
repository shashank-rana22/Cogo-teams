import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

interface IrnCancellationProps {
	id?: string,
	setShowCancellationModal?: (p: boolean)=> void,
	response:any,
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

	const onSubmit = async (values) => {
		try {
			const payload = {
				cancelReason      : response?.remarks || undefined,
				agreementNumber   : values?.Agreement_number || undefined,
				agreementDate     : values?.Agreement_date || undefined,
				agreementDocument : values?.Agreement_pdf_file?.finalUrl || undefined,
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
