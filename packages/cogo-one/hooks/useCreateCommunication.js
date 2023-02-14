import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateCommunicationLog = ({ setInputValue, setDate, setTime }) => {
	const { partnerId, userId, id } = useSelector(({ profile }) => ({
		id        : profile?.id,
		userId    : profile?.user?.id,
		partnerId : profile.partner || {},
	}));
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_communication_log',
		method : 'post',
	}, { manual: true });

	const createLogApi = async ({ inputValue, date, time }) => {
		const payload = {
			communication_type       : 'meeting',
			agent_id                 : id,
			user_id                  : userId,
			title                    : inputValue,
			reminder_date            : date,
			// communication_response   : val?.response,
			// organization_id          : orgId,
			partner_id               : partnerId?.id,
			communication_start_time : time?.start_time,
			communication_end_time   : time?.end_time,
		};
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Successfully Saved');
			setInputValue('');
			setDate('');
			setTime({});
		} catch (error) {
			Toast.error(error);
		}
	};
	return {
		createLogApi,
		loading,
	};
};
export default useCreateCommunicationLog;
