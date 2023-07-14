import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface Props {
	refetch: () => Promise<void>;
	setShowConfirm: React.Dispatch<React.SetStateAction<string | boolean>>;
}

interface Profile {
	profile?: { user: { id: string } };
}

const usePostToSageBulk = ({ refetch, setShowConfirm }: Props) => {
	const profile: Profile = useSelector((state) => state);
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
