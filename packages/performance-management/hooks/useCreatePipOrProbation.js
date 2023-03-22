import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useIrisRequest } from '@cogoport/request';

const useCreatePipOrProbation = () => {
	const [{ loading = false }, trigger] = useIrisRequest({
		url    : 'post_iris_create_log',
		method : 'post',
	}, { manual: true });

	const onSubmitCreate = async (item, LogType) => {
		// console.log('item', item, LogType);
		const { user_id:UserID = '', startDate:StartDate = {}, endDate:EndDate = {} } = item;
		try {
			await trigger({ data: { UserID, LogType, StartDate, EndDate } });
		} catch (e) {
			Toast.error(getApiErrorString(e.response?.data.error));
		}
	};

	return { onSubmitCreate, loading };
};

export default useCreatePipOrProbation;
