import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface PostSettlementProps {
	refetch: ()=> void;
	setCheckedRows?: (p: object)=> void;
}

const usePostSettlementToSage = ({ refetch, setCheckedRows = () => {} } :PostSettlementProps) => {
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
			setCheckedRows({});
			Toast.success('Processing your request. Please come back later.');
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		bulkPostToSageAction,
		loading,
		data,
	};
};

export default usePostSettlementToSage;
