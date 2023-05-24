import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

interface IrnCancellationProps {
	id?: string,
	setShowCancellationModal?: (p: boolean)=> void,
}

const useGetIrnCancellation = ({ id, setShowCancellationModal }: IrnCancellationProps) => {
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

	const cancelIrn = async (response) => {
		try {
			const payload = {
				cancelReason   : response?.value,
				cancelReminder : response?.remarks,
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
		cancelIrn,
		loading,
	};
};

export default useGetIrnCancellation;
