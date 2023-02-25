import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import FormatData from '../utils/formatData';

function useCreateCommunicationLog({
	setInputValue,
	setDate,
	fetchListLogApi = () => {},
	activeMessageCard,
	activeTab,
	activeVoiceCard,
}) {
	const {
		orgId = '',
		userId = '',
	} = FormatData({ activeMessageCard, activeVoiceCard });

	const { partnerId, agentID } = useSelector(({ profile }) => ({
		partnerId : profile.partner?.id || {},
		agentID   : profile?.user?.id || {},
	}));

	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_communication_log',
		method : 'post',
	}, { manual: true });

	const createLogApi = async ({ inputValue, date }) => {
		let payload = {};
		if (activeTab === 'voice') {
			payload = {
				communication_type    : 'meeting',
				is_reminder           : 'true',
				agent_id              : agentID,
				user_id               : userId,
				title                 : inputValue?.title,
				reminder_date         : date,
				communication_summary : inputValue?.description,
				organization_id       : orgId,
				partner_id            : partnerId,
			};
		} else {
			payload = {
				communication_type    : 'meeting',
				is_reminder           : 'true',
				agent_id              : agentID,
				user_id               : userId,
				title                 : inputValue?.title,
				reminder_date         : date,
				communication_summary : inputValue?.description,
				organization_id       : orgId,
				partner_id            : partnerId,
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
