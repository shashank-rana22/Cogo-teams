import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const getPayload = ({
	performedById = '', userType = '', saasSubscriptionCustomerId = '',
	planPricingId = '', selectedUserId = '',
}) => ({
	customer_id       : saasSubscriptionCustomerId,
	plan_pricing_id   : planPricingId,
	user_id           : selectedUserId,
	source            : 'cogoone',
	performed_by_id   : performedById,
	performed_by_type : userType === 'partner' ? 'user' : 'agent',
});

function useCreatePaymentLink({ saasSubscriptionCustomerId = '', getUserActivePlans = () => {}, selectedUserId = '' }) {
	const {
		performedById,
		userType,
	} = useSelector(({ profile }) => ({
		performedById : profile.user.id,
		userType      : profile.user.session_type,
	}));

	const [{ loading }, trigger] = useRequest({
		url    : '/create_subscription_payment_link',
		method : 'post',
	}, { manual: true });

	const createLink = async ({ planPricingId = '' }) => {
		try {
			await trigger({
				data: getPayload({
					performedById,
					userType,
					saasSubscriptionCustomerId,
					planPricingId,
					selectedUserId,
				}),
			});
			getUserActivePlans();
		} catch (error) {
			Toast.error('Unable to generate payment link');
		}
	};

	return {
		createLink,
		createLinkloading: loading,
	};
}
export default useCreatePaymentLink;
