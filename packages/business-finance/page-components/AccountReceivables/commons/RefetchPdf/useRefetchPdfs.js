import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

export default function useRefetchPdfs({ id = '' }) {
	const [
		{ loading },
		trigger,
	] = useRequestBf(
		{
			url     : `/sales/invoice/${id}/refetch-pdfs`,
			method  : 'post',
			authKey : 'post_sales_invoice_by_id_refetch_pdfs',
		},
		{ manual: true },
	);
	const onRefetch = async () => {
		try {
			const { data: { data } } = await trigger();
			Toast.success(data);
		} catch (e) {
			Toast.error(e?.message);
		}
	};
	return {
		onRefetch,
		loading,
	};
}
