import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useCreateCommunicationLog({
	selectPill,
	setInputValue = () => {},
	setSelectPill = () => {},
	inputValue,
}) {
	const profileData = useSelector(({ profile }) => profile);
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_communication_log',
		method : 'post',
	}, { manual: true });

	const voiceCallData = profileData?.voice_call;
	const { startTime, endTime } = voiceCallData || {};

	const communicationLogApi = async () => {
		const payload = {
			communication_type       : 'call',
			is_reminder              : 'true',
			agent_id                 : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
			user_id                  : 'cba50126-efbc-4caa-8383-b616dec9d44b',
			title                    : selectPill,
			// reminder_date            : date,
			communication_summary    : inputValue,
			organization_id          : 'bbde20db-d8b8-4be7-8307-367666847041',
			partner_id               : '6fd98605-9d5d-479d-9fac-cf905d292b88',
			communication_start_time : startTime,
			communication_end_time   : endTime,
		};

		try {
			await trigger({
				data: payload,
			});
			Toast.success('Saved Successfully');
			setInputValue('');
			setSelectPill('');
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
