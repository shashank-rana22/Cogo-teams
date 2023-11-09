import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ status = '', id = '', rejectReason = '', partnerId = '' }) => ({
	document_id         : id,
	partner_id          : partnerId,
	verification_status : status,
	rejection_reason    : rejectReason || undefined,
});

const useUpdateChannelPartnerDocument = ({
	setRejectAccount = () => {},
	setVerifyAccount = () => {},
	onboardingRequest = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_channel_partner_document',
		method : 'POST',
	}, { manual: true });

	const updateCpDocument = async ({ id = '', status = '', rejectReason = '', partnerId = '' }) => {
		try {
			await trigger({
				data: getPayload({ id, status, rejectReason, partnerId }),
			});
			setRejectAccount({
				show         : false,
				rejectReason : '',
			});
			setVerifyAccount({
				show               : false,
				showAccountDetails : false,
				accountData        : [],
				orgData            : {},
				verifyType         : '',
				accountType        : '',
			});
			Toast.success(`Document ${status === 'verified' ? 'Verify' : 'Rejected'} Successfully`);
			onboardingRequest({ page: 1 });
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data) || 'something went wrong');
		}
	};

	return {
		updateCpDocument,
		cpLoading: loading,
	};
};

export default useUpdateChannelPartnerDocument;
