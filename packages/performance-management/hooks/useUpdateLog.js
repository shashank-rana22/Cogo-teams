import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';

const useUpdateLog = () => {
	const [{ loading }, trigger] = useIrisRequest({
		url    : 'post_iris_update_log',
		method : 'post',
	}, { manual: true });

	const onUpdateLog = async (logItem, setRefetchList, setModal) => {
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
				Tags          : Tags || undefined,
				FinalDecision : FinalDecision || undefined,
				IsReviewed,
				Comment       : Comment || undefined,
			};

			await trigger({
				data: payload,
			});
			setRefetchList(true);
			setModal('');
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
