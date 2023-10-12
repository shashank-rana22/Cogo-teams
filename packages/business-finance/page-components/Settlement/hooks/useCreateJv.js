import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateJv = ({ setShow, refetch, setJvSearch, setDryRun }) => {
	const profile = useSelector((state) => state);
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
			const res = await trigger({ data: { ...(payload || {}), createdBy: profileid } });
			Toast.success('Jv Created Successfully');
			const { data: jvNum = '' } = res || {};
			setShow(false);
			setDryRun(false);
			setJvSearch(jvNum.data || '');
			refetch(jvNum.data || '');
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
