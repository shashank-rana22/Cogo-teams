import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const getPayload = ({ performedById = '', userType = '', billingAddressId = '', checkoutId = '' }) => ({
	performed_by_id    : performedById,
	performed_by_type  : userType === 'partner' ? 'user' : 'agent',
	checkout_id        : checkoutId,
	billing_address_id : billingAddressId,
});

function useCreateSubscriptionInvoice({
	selectedAddress = {}, checkoutId = '',
	setIsAssignModal = () => {}, getUserActivePlans = () => {},
}) {
	const { id : billingAddressId = '' } = selectedAddress || {};

	const {
		performedById,
		userType,
	} = useSelector(({ profile }) => ({
		performedById : profile.user.id,
		userType      : profile.user.session_type,
	}));

	const [{ loading }, trigger] = useRequest({
		url    : '/create_subscription_generate_invoice',
		method : 'post',
	}, { manual: true });

	const createSubscriptionInvoice = async () => {
		try {
			await trigger({
				data: getPayload({
					performedById,
					userType,
					billingAddressId,
					checkoutId,
				}),
			});
			setIsAssignModal(false);
			getUserActivePlans();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		createSubscriptionInvoice,
		loading,
	};
}

export default useCreateSubscriptionInvoice;
