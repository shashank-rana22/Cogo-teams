import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const usePostToSageBulk = ({ refetch, setShowConfirm }) => {
	const profile = useSelector((state) => state);
	const {
		profile: { user },
	} = profile || {};
	const { id: profileid } = user || {};
	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/payments/accounts/bulk-post-to-sage',
			authKey : 'post_payments_accounts_bulk_post_to_sage',
			method  : 'post',
		},
		{ manual: true },
	);

	const post = async (ids) => {
		try {
			await trigger({
				data: {
					ids,
					performedBy: profileid,
				},
			});
			Toast.success('Processing your request. Please comeback later.');
			refetch();
			setShowConfirm(false);
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		post,
		loading,
	};
};

export default usePostToSageBulk;
