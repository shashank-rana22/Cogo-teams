import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';

const useReassignManager = ({
	userId, setOpenReassign = () => {},
	setManagerId = () => {}, reset = () => {},
}) => {
	const [{ loading = false }, trigger] = useIrisRequest({
		url    : 'post_iris_update_partner_user_admin_mapping',
		method : 'post',
	}, { manual: true });

	console.log('herer', userId);

	const onReassign = async (managerId) => {
		try {
			await trigger({ data: { UserID: userId || undefined, ManagerID: managerId || undefined } });
			Toast.success('Reassigned Successfully!!');
			reset();
			setManagerId('');
			setOpenReassign(false);
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	};

	return { onReassign, loading };
};

export default useReassignManager;
