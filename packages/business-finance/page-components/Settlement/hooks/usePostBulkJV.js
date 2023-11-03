import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

function usePostBulkJV() {
	const [{ loading = false }, trigger] = useRequestBf(
		{
			url     : '/payments/parent-jv/bulk-post-jv',
			authKey : 'post_payments_parent_jv_bulk_post_jv',
			method  : 'post',
		},
		{ manual: true },
	);

	const bulkPostJV = async ({ selectedJV = [], setSelectedJV = () => {} }) => {
		try {
			await trigger({
				data: selectedJV,
			});

			setSelectedJV([]);

			Toast.success('Processing your request. Please come back later.');

			setTimeout(() => {
				Toast.default('Please Refresh after some time');
			}, [1000]);
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		loading,
		bulkPostJV,
	};
}

export default usePostBulkJV;
