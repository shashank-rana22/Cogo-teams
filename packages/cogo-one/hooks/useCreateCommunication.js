import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useCreateCommunicationLog({
	setInputValue,
	setDate, setTime,
	fetchListLogApi = () => {},
	activeMessageCard,
	activeTab,
	activeVoiceCard,
}) {
	const { organization_id, agent_id, user_id } = activeVoiceCard || {};
	const { organization_id: OrgId, agent_id: AgentId, user_id: UserId } = activeMessageCard || {};
	const { partnerId } = useSelector(({ profile }) => ({
		partnerId: profile.partner || {},
	}));
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_communication_log',
		method : 'post',
	}, { manual: true });

	const createLogApi = async ({ inputValue, date, time }) => {
		let payload;
		if (activeTab === 'voice') {
			payload = {
				communication_type       : 'meeting',
				is_reminder              : 'true',
				agent_id,
				user_id,
				title                    : inputValue?.title,
				reminder_date            : date,
				communication_summary    : inputValue?.description,
				organization_id,
				partner_id               : partnerId?.id,
				communication_start_time : time?.start_time,
				communication_end_time   : time?.end_time,
			};
		} else {
			payload = {
				communication_type       : 'meeting',
				is_reminder              : 'true',
				agent_id                 : AgentId,
				user_id                  : UserId,
				title                    : inputValue?.title,
				reminder_date            : date,
				communication_summary    : inputValue?.description,
				organization_id          : OrgId,
				partner_id               : partnerId?.id,
				communication_start_time : time?.start_time,
				communication_end_time   : time?.end_time,
			};
		}

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
