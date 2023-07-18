import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useSendRailIndentEMail = () => {
	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/send_rail_domestic_indent_email',
	}, { manual: true });
	const sendRailIndentEmail = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Mail is Sent Successfully');
		} catch (e) {
			Toast.error(e?.message);
		}
	};
	return {
		loading,
		sendRailIndentEmail,
	};
};
export default useSendRailIndentEMail;
