import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useGetRefresh = ({ id, refetch }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/sales/invoice/update-org-detail-for-irn-failed',
			method  : 'post',
			authKey : 'post_sales_invoice_update_org_detail_for_irn_failed',
		},
		{ manual: true },
	);

	const refresh = async () => {
		try {
			const resp = await trigger({
				data: {
					invoiceId: id || undefined,
				},
			});
			Toast.success(resp?.data || 'Refresh Successfully');

			refetch();
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		refresh,
		data,
		loadingOnRefresh: loading,
	};
};

export default useGetRefresh;
