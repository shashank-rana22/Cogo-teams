import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const usePostToSage = ({ id, refetch = () => {} }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/sales/invoice/post-to-sage',
			method  : 'post',
			authKey : 'post_sales_invoice_post_to_sage',
		},
		{ manual: true },
	);

	const postToSage = async () => {
		try {
			const resp = await trigger({ data: { id } });
			if (resp?.data?.data === 'Success.') {
				refetch();
				Toast.success('Post to sage successful');
			} else {
				Toast.error('Post to failed');
			}
		} catch (err) {
			Toast.error(err?.response?.data?.message);
		}
	};

	return {
		postToSage,
		data,
		loading,
	};
};

export default usePostToSage;
