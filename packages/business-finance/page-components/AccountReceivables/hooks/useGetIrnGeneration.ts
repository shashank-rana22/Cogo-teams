import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

interface IrnGenerationProps {
	id?: string,
	refetch?: Function
}

const useGetIrnGeneration = ({ id, refetch }: IrnGenerationProps) => {
	const [
		{ data, loading },
		generateIrnTrigger,
	] = useRequestBf(
		{
			url     : `/sales/invoice/${id}/irn-generate`,
			method  : 'post',
			authKey : 'post_sales_invoice_by_id_irn_generate',
		},
		{ manual: true },
	);

	const generateIrn = async () => {
		try {
			const resp = await generateIrnTrigger();
			if (resp.status === 200) {
				Toast.success('IRN Generated Successfully');
			} else {
				Toast.success('IRN Generated Failed');
			}
			refetch();
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	return {
		generateIrn,
		data,
		loading,
	};
};

export default useGetIrnGeneration;
