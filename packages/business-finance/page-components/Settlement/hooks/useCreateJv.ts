import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateJv = ({ setShow, refetch }) => {
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
			await trigger({ data: { ...(payload || {}), createdBy: profileid } });
			Toast.error('Jv Created Successfully');
			setShow(false);
			refetch();
		} catch (e) {
			console.log(e);
			setShow(false);
		}
	};

	return {
		create,
		loading,
	};
};

export default useCreateJv;
