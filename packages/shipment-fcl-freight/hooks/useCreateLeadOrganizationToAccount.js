import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import useUpdateShipmentPendingTask from './useUpdateShipmentPendingTask';

const ONE = '1';

const getFormattedPayload = ({ leadsData = {}, selectedPocId = '' }) => {
	const payload = {
		lead_organization_id : leadsData?.id,
		lead_user_id         : selectedPocId,
	};

	return payload;
};

function useCreateLeadOrganizationToAccount({
	setStep = () => {},
	setConsigneeShipperId = () => {},
	leadsData = {},
	task = {},
}) {
	const { apiTrigger = () => {} } = useUpdateShipmentPendingTask({ successMessage: 'Updated Successfully' });

	const [{ loading }, trigger] = useRequest({
		url    : '/create_lead_organization_to_account',
		method : 'POST',
	}, { manual: true });

	const createLeadOrgAccount = async ({ selectedPocId = '' }) => {
		try {
			const payload = getFormattedPayload({ leadsData, selectedPocId });

			const res = await trigger({ data: payload });

			if (res?.data) {
				setConsigneeShipperId(res?.data?.organization_id);
			}

			const updatePendingTaskPayload = {
				id     : task?.id,
				tags   : [ONE],
				status : 'pending',
			};

			await apiTrigger({ ...updatePendingTaskPayload });

			setStep(ONE);
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		createLoading: loading,
		createLeadOrgAccount,
	};
}

export default useCreateLeadOrganizationToAccount;
