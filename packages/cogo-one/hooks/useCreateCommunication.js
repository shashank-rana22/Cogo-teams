import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useCreateCommunicationLog({ setInputValue, setDate, setTime, fetchListLogApi = () => {} }) {
	const { partnerId } = useSelector(({ profile }) => ({
		partnerId: profile.partner || {},
	}));
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_communication_log',
		method : 'post',
	}, { manual: true });

	const createLogApi = async ({ inputValue, date, time }) => {
		const payload = {
			communication_type       : 'meeting',
			is_reminder              : 'true',
			agent_id                 : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
			user_id                  : 'cba50126-efbc-4caa-8383-b616dec9d44b',
			title                    : inputValue?.title,
			reminder_date            : date,
			communication_summary    : inputValue?.description,
			organization_id          : 'bbde20db-d8b8-4be7-8307-367666847041',
			partner_id               : partnerId?.id,
			communication_start_time : time?.start_time,
			communication_end_time   : time?.end_time,
		};
		try {
			await trigger({
				data: payload,
			});
			fetchListLogApi();
			Toast.success('Successfully Saved');
			setInputValue({
				title       : '',
				description : '',
			});
			setDate('');
			setTime({
				start_time : '',
				end_time   : '',
			});
		} catch (error) {
			Toast.error(error);
		}
	};
	return {
		createLogApi,
		loading,
	};
}
export default useCreateCommunicationLog;
