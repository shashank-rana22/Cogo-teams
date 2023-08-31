import { useRequest } from '@cogoport/request';

const getPayload = ({ id }) => ({
	params: {
		is_read: true,
		id,
	},
});

function useUpdateVoiceCallRecord({ fetchUnreadCall = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_voice_call_record',
		method : 'post',
	}, { manual: true });

	const updateMissedVoiceCount = async ({ id = '' }) => {
		try {
			await trigger(getPayload({ id }));
			fetchUnreadCall();
		} catch (error) {
			console.error(error);
		}
	};
	return {
		updateMissedVoiceCount,
		createLoading: loading,
	};
}
export default useUpdateVoiceCallRecord;
