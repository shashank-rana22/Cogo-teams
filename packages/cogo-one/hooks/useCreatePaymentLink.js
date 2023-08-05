import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const getPayload = ({ performedById = '', userType = '', saasSubscriptionCustomerId = '', planPricingId = '' }) => ({
	saas_subscription_customer_id : saasSubscriptionCustomerId,
	plan_pricing_id               : planPricingId,
	user_id                       : performedById,
	platform                      : 'cogone',
	performed_by_id               : performedById,
	performed_by_type             : userType === 'partner' ? 'user' : 'agent',
});

function useCreatePaymentLink({ saasSubscriptionCustomerId = '' }) {
	const {
		performedById,
		userType,
	} = useSelector(({ profile }) => ({
		performedById : profile.user.id,
		userType      : profile.user.session_type,
	}));

	const [showLink, setShowLink] = useState({ show: false, link: '' });

	const [{ loading }, trigger] = useRequest({
		url    : '/create_subscription_payment_link',
		method : 'post',
	}, { manual: true });

	const createLink = async ({ planPricingId = '' }) => {
		try {
			const response = await trigger({
				data: getPayload({
					performedById,
					userType,
					saasSubscriptionCustomerId,
					planPricingId,
				}),
			});
			const { link = '' } = response?.data || {};
			setShowLink({ show: true, linkUrl: link });
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
			setShowLink({ show: true, linkUrl: 'It is pending from backend' });
		}
	};

	return {
		createLink,
		createLinkloading: loading,
		showLink,
	};
}
export default useCreatePaymentLink;
