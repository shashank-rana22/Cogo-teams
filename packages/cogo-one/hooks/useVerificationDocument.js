import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import { getCpSpPayload, getIePayload, getTradePartyPayload } from '../utils/platformAdoption';

const API_MAPPING = {
	SP          : 'verify_channel_partner_kyc',
	CP          : 'verify_channel_partner_kyc',
	IE          : 'verify_organization_kyc',
	trade_party : 'verify_organization_trade_party',
};

const PAYLOAD_MAPPING = {
	CP          : getCpSpPayload,
	SP          : getCpSpPayload,
	IE          : getIePayload,
	trade_party : getTradePartyPayload,
};

const getPaylaod = ({
	accountType = '', type = '',
	orgId = '', rejectReason = '',
}) => PAYLOAD_MAPPING[accountType]?.({ accountType, type, orgId, rejectReason });

const useVerificationDocument = ({
	setRejectAccount = () => {},
	setVerifyAccount = () => {},
	onboardingRequest = () => {},
	accountType = '',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : `/${API_MAPPING[accountType]}`,
		method : 'post',
	}, { manual: true });

	const verifyDocument = async ({ type = '', orgId = '', rejectReason = '' }) => {
		try {
			await trigger({
				data: getPaylaod({ type, orgId, accountType, rejectReason }),
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
			onboardingRequest({ page: 1 });
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		verifyDocument,
	};
};

export default useVerificationDocument;
