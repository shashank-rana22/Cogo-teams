import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const usePostToSage = (id: string) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/sales/invoice/post-to-sage',
			method  : 'post',
			authKey : 'post_sales_invoice_post_to_sage',
		},
		{ manual: true },
	);

	const postToSage = async () => {
		try {
			await trigger({ data: { id } });
			Toast.success('Post to sage successful');
		} catch (err) {
			Toast.error(err?.error?.message);
		}
	};

	return {
		postToSage,
		data,
		loading,
	};
};

export default usePostToSage;
