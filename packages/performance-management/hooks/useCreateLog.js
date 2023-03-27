import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useIrisRequest } from '@cogoport/request';

const useCreateLog = () => {
	const [{ loading }, trigger] = useIrisRequest({
		url    : 'post_iris_update_log',
		method : 'post',
	}, { manual: true });

	const onCreateLog = async (logItem) => {
		try {
			const {
				user_id:UserID,
				log_id:LogID,
				log_type:LogType,
				tags:Tags,
				final_decision:FinalDecision,
				is_reviewed:IsReviewed,
				comment:Comment,
			} = logItem;

			const payload = {
				UserID,
				LogID,
				LogType,
				Tags,
				FinalDecision,
				IsReviewed,
				Comment,
			};

			await trigger({
				data: payload,
			});
		} catch (e) {
			Toast.error(getApiErrorString(e.response?.data.error));
		}
	};

	return {
		onCreateLog,
		createLogLoading: loading,
	};
};

export default useCreateLog;
