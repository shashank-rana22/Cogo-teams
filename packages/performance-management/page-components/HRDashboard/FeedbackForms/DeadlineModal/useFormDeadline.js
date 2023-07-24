import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';

const useFormDeadline = ({ setOpenActivateModal, refetchFormDeadline }) => {
	const [{ loading = false }, trigger] = useIrisRequest({
		url    : 'post_iris_update_form_deadline',
		method : 'post',
	}, { manual: true });

	const onUpdateFormDeadline = async (deadline) => {
		try {
			const response = await trigger({ data: { Deadline: deadline } });
			Toast.success(response.data.message?.toString());
			setOpenActivateModal(false);
			refetchFormDeadline();
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	};
	return { onUpdateFormDeadline, loading };
};
export default useFormDeadline;
