import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useIrisRequest } from '@cogoport/request';

const useCreateLog = () => {
	const [{ loading:createLogLoading = false }, trigger] = useIrisRequest({
		url    : 'post_iris_update_log',
		method : 'post',
	}, { manual: true });

	const onCreateLog = async (logItem) => {
		const {
			user_id:UserID = '',
			log_id:LogID = '',
			log_type:LogType = '',
			tags:Tags = [],
			final_decision:FinalDecision = '',
			is_reviewed:IsReviewed = false,
			comment:Comment = '',
		} = logItem;
		try {
			await trigger({
				data: { UserID, LogID, LogType, Tags, FinalDecision, IsReviewed, Comment },
			});
			Toast.success('Submitted the Log Successfully');
		} catch (e) {
			Toast.error(getApiErrorString(e.response?.data.error));
		}
	};

	return {
		onCreateLog,
		createLogLoading,
	};
};

export default useCreateLog;
