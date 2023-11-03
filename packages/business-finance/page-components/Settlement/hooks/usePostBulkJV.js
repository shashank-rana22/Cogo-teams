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

	const bulkPostJV = async ({ selectedJV = [] }) => {
		await trigger({
			data: selectedJV,
		});
	};

	return {
		loading,
		bulkPostJV,
	};
}

export default usePostBulkJV;
