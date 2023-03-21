import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';

const useReassignManager = ({
	userId, managerId, setOpenReassign = () => {},
	setManagerId = () => {}, reset = () => {},
}) => {
	const [{ loading = false }, trigger] = useIrisRequest({
		url    : 'post_user_reassign_manager',
		method : 'post',
	}, { manual: true });

	const onReassign = async () => {
		try {
			await trigger({ UserID: userId || undefined, ManagerID: managerId || undefined });
			Toast.success('Reassigned Successfully!!');
			reset();
			setManagerId('');
			setOpenReassign(false);
		} catch (e) {
			Toast.error(e.response.data.error.toString());
		}
	};

	return { onReassign, loading };
};

export default useReassignManager;
