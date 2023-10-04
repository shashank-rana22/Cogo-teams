import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface Profile {
	profile?: { user: { id: string } }
}

const useCreateJv = ({ setShow, refetch }) => {
	const profile: Profile = useSelector((state) => state);
	const { profile: { user } } = profile || {};
	const { id: profileid } = user || {};
	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/payments/parent-jv',
			authKey : 'post_payments_parent_jv',
			method  : 'post',
		},
		{ manual: true },
	);

	const create = async (payload) => {
		try {
			await trigger({ data: { ...(payload || {}), createdBy: profileid } });
			Toast.error('Jv Created Successfully');
			setShow(false);
			refetch();
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Jv Creation Failed');
		}
	};

	return {
		create,
		loading,
	};
};

export default useCreateJv;
