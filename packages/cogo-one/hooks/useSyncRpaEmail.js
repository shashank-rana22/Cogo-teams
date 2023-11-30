import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const getPayload = ({
	internet_message_id,
	communication_id,
	email_id,
}) => ({
	internet_message_id,
	communication_id,
	email_id,
});

const useSyncRpaEmail = ({
	internet_message_id = '',
	communication_id = '',
	email_id = '',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/sync_rpa_email',
		method : 'post',
	}, { manual: true });

	const syncRpaEmail = async () => {
		try {
			await trigger({
				data: getPayload({
					internet_message_id,
					communication_id,
					email_id,
				}),
			});
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong');
		}
	};

	return { syncLoading: loading, syncRpaEmail };
};

export default useSyncRpaEmail;
