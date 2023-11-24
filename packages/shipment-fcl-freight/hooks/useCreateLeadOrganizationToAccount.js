import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import useUpdateShipmentPendingTask from './useUpdateShipmentPendingTask';

const getFormattedPayload = ({ leadsData = {}, selectedPocId = '' }) => {
	const payload = {
		lead_organization_id : leadsData?.id,
		lead_user_id         : selectedPocId,
	};

	return payload;
};

function useCreateLeadOrganizationToAccount({
	shipment_data = {},
	setStep = () => {},
	leadsData = {},
	task = {},
	setConsigneeId = () => {},
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

			const updatePendingTaskPayload = {
				id     : task?.id,
				tags   : ['1'],
				status : 'pending',
				data   : {
					shipment: {
						id                   : shipment_data?.id,
						consignee_shipper_id : res?.data?.organization_id,
					},
					pending_task: {
						id              : task?.id,
						organization_id : res?.data?.organization_id,
					},
				},
			};

			await apiTrigger({ ...updatePendingTaskPayload });

			setConsigneeId(res?.data?.organization_id);

			setStep(1);
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
