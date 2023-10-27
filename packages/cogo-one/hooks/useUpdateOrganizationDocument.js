import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({
	document_type = '', id = '', status = '', organization_trade_party_id = '', rejectReason = '',
}) => ({
	document_type,
	id,
	verification_status : status,
	organization_trade_party_id,
	rejection_reason    : rejectReason || undefined,
});

const useUpdateOrganizationDocument = ({
	setRejectAccount = () => {},
	setVerifyAccount = () => {},
	onboardingRequest = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_organization_document',
		method : 'POST',

	}, { manual: true });

	const updateDocument = async ({ val = {}, status = '', rejectReason = '' }) => {
		const { document_type = '', id = '', organization_trade_party_id = '' } = val || {};
		try {
			await trigger({
				data: getPayload({ document_type, id, status, organization_trade_party_id, rejectReason }),
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
			Toast.success('Document Verify Successfully');
			onboardingRequest({ page: 1 });
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data) || 'something went wrong');
		}
	};

	return {
		updateDocument,
		updateLoading: loading,
	};
};

export default useUpdateOrganizationDocument;
