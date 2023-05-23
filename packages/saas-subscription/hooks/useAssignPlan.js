import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useAssignPlan = ({ setOpenPlanModal, refectUserList }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_saas_subscription',
	}, { manual: true });

	const formHook = useForm();

	const closeModal = () => {
		setOpenPlanModal(false);
	};

	const submitHandler = async (data) => {
		const {
			organizationId = '',
			planId = '',
		} = data || {};
		try {
			await trigger({
				data: {
					plan_pricing_id : planId,
					organization_id : organizationId,
				},
			});
			refectUserList();
			closeModal();
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		formHook,
		submitHandler,
		loading,
		closeModal,
	};
};

export default useAssignPlan;
