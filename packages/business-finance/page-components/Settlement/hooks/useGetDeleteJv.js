import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetDeleteJv = ({ setShowConfirm, refetch }) => {
	const profile = useSelector((state) => state);
	const { profile: { user } } = profile || {};
	const { id: profileid } = user || {};
	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/payments/parent-jv',
			authKey : 'delete_payments_parent_jv',
			method  : 'delete',
			data    : {},
		},
		{ manual: true },
	);

	const deleteJv = async (id) => {
		try {
			await trigger({
				params: {
					id,
					performedBy: profileid,
				},
			});
			refetch();
			Toast.success('Deleted Successfully');
			setShowConfirm(false);
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		deleteJv,
		loading,
	};
};

export default useGetDeleteJv;
