import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import { getCpSpPayload, getIePayload, getTradePartyPayload } from '../utils/platformAdoption';

import useUpdateOnboardingRequest from './useUpdateOnboardingRequest';

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
	orgId = '', rejectReason = [], otherReason = '',
}) => PAYLOAD_MAPPING[accountType]?.({ accountType, type, orgId, rejectReason, otherReason });

const useVerificationKyc = ({
	setRejectAccount = () => {},
	setVerifyAccount = () => {},
	onboardingRequest = () => {},
	accountType = '',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : `/${API_MAPPING[accountType]}`,
		method : 'post',
	}, { manual: true });

	const { requestLoader = false, updateRequest = () => {} } = useUpdateOnboardingRequest();

	const verifyKyc = async ({
		type = '', orgId = '', rejectReason = [], otherReason = '',
		requestId, requestStatus,
	}) => {
		try {
			const res = await trigger({
				data: getPaylaod({ type, orgId, accountType, rejectReason, otherReason }),
			});

			if (res?.data?.id) {
				await updateRequest({ requestId, requestStatus });
			}
			setRejectAccount({
				show         : false,
				rejectReason : [],
				otherReason  : '',
			});
			setVerifyAccount({
				show               : false,
				showAccountDetails : false,
				accountData        : [],
				orgData            : {},
				verifyType         : '',
				accountType        : '',
			});
			Toast.success('Account Verified');
			onboardingRequest({ page: 1 });
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading: loading || requestLoader,
		verifyKyc,
	};
};

export default useVerificationKyc;
