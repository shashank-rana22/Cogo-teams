import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface Props {
	refetch: () => void;
	setShowConfirm: React.Dispatch<React.SetStateAction<string | boolean>>;
}

interface Profile {
	profile?: { user:{ id:string } }
}

const usePostToSage = ({ setShowConfirm, refetch }: Props) => {
	const profile:Profile = useSelector((state) => state);
	const { profile: { user } } = profile || {};
	const { id: profileid } = user || {};
	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/payments/parent-jv/post-to-sage',
			authKey : 'post_payments_parent_jv_post_to_sage',
			method  : 'post',
		},
		{ manual: true },
	);

	const post = async (id) => {
		try {
			const resp = await trigger({
				data: {
					parentJvId  : id,
					performedBy : profileid,
				},
			});

			if (resp?.data?.data === 'Success.') {
				setShowConfirm(false);
				Toast.success('Jv Posted Successfully');
				refetch();
			} else {
				Toast.error('Post to sage Failed');
			}
			refetch();
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		post,
		loading,
	};
};

export default usePostToSage;
