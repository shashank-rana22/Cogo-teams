import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { usePublicRequest } from '@cogoport/request';

function useSendMail(mailProps) {
	const {
		setShowMailModal = () => {},
		setEmailState = () => {},
		setRecipientArray = () => {},
		setBccArray = () => {},
	} = mailProps;

	const [{ loading }, trigger] = usePublicRequest({
		url    : `${process.env.NEXT_PUBLIC_COGO_LENS_URL}/send_mail`,
		method : 'POST',
	}, { manual: true });

	const createMail = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Mail Sent Successfully.');
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		} finally {
			setEmailState({
				body    : '',
				subject : '',
			});
			setRecipientArray([]);
			setBccArray([]);
			setShowMailModal(false);
		}
	};

	return {
		createMail,
		createMailLoading: loading,
	};
}
export default useSendMail;
