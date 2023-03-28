import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';

const useCreateLog = () => {
	const [{ loading = false }, trigger] = useIrisRequest({
		url    : 'post_iris_create_log',
		method : 'post',
	}, { manual: true });

	const onSubmitCreate = async (item, LogType, setRefetchList, setModal) => {
		const { user_id:UserID = '', startDate:StartDate = {}, endDate:EndDate = {} } = item;

		try {
			await trigger({ data: { UserID, LogType, StartDate, EndDate } });
			setRefetchList(true);
			setModal('');
			Toast.success('Updated Successfully');
		} catch (e) {
			Toast.error(e.response?.data.error);
		}
	};

	return { onSubmitCreate, loading };
};

export default useCreateLog;
