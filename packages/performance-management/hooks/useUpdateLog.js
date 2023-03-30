import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';

const useUpdateLog = () => {
	const [{ loading }, trigger] = useIrisRequest({
		url    : 'post_iris_update_log',
		method : 'post',
	}, { manual: true });

	const onUpdateLog = async (payload, onSubmitReset) => {
		try {
			await trigger({
				data: payload,
			});
			onSubmitReset();
			Toast.success('Updated Successfully');
		} catch (e) {
			Toast.error(e.response?.data.error);
		}
	};

	return {
		onUpdateLog,
		createLogLoading: loading,
	};
};

export default useUpdateLog;
