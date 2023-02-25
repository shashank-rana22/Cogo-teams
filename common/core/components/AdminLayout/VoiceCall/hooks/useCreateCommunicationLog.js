import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useCreateCommunicationLog({
	callTitle,
	setInputValue = () => {},
	setCallTitle = () => {},
	inputValue,
}) {
	const profileData = useSelector(({ profile }) => profile);
	const voiceCall = profileData?.voice_call;
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_communication_log',
		method : 'post',
	}, { manual: true });

	const voiceCallData = profileData?.voice_call;
	const { startTime, endTime } = voiceCallData || {};

	const communicationLogApi = async () => {
		const {
			orgId,
			userId,
			agentId,
		} = voiceCall || {};

		const payload = {
			communication_type       : 'call',
			is_reminder              : 'true',
			agent_id                 : agentId,
			user_id                  : userId,
			title                    : callTitle,
			communication_summary    : inputValue,
			organization_id          : orgId,
			partner_id               : profileData?.partner?.id,
			communication_start_time : startTime,
			communication_end_time   : endTime,
		};

		try {
			await trigger({
				data: payload,
			});
			Toast.success('Saved Successfully');
			setInputValue('');
			setCallTitle('');
		} catch (error) {
			Toast.error(error);
		}
	};

	return {
		communicationLogApi,
		loading,
	};
}

export default useCreateCommunicationLog;
