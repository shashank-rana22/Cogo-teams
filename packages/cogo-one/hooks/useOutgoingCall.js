import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';

function useOutgoingCall() {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_outgoing_call',
		method : 'post',
	}, { manual: true });

	const makeCallApi = async () => {
		try {
			await trigger({
				data: {
					agent_id        : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
					organization_id : 'bbde20db-d8b8-4be7-8307-367666847041',
					user_id         : 'cba50126-efbc-4caa-8383-b616dec9d44b',
				},
			});
		} catch (error) {
			Toast.error(error?.response?.data?.message[0]);
		}
	};

	return {
		makeCallApi,
		callLoading: loading,
	};
}
export default useOutgoingCall;
