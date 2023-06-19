import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const usePostSettlementToSage = (refetch) => {
	interface Profile {
		profile?: { user: { id: string } }
	}
	const profile: Profile = useSelector((state) => state);
	const { profile: { user } } = profile || {};
	const { id: profileid } = user || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/settlement/bulk-matching-on-sage',
			authKey : 'post_payments_settlement_bulk_matching_on_sage',
			method  : 'post',
		},
		{ manual: true },
	);

	const bulkPostToSageAction = async (itemData) => {
		try {
			await trigger({
				data: {
					settlementIds : itemData,
					performedBy   : profileid,
				},
			});
			refetch();
			Toast.success('Processing your request. Please comeback later.');
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	return {
		bulkPostToSageAction,
		loading,
		data,
	};
};

export default usePostSettlementToSage;
