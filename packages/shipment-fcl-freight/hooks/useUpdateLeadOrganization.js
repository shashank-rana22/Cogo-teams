import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import useUpdateShipmentPendingTask from './useUpdateShipmentPendingTask';

const getFormattedPayload = ({ values = {}, leadsData = {} }) => {
	const payload = {
		account_type        : 'importer_exporter',
		business_name       : values?.company_name,
		id                  : leadsData?.id,
		country_id          : values?.country_id,
		registration_number : values?.registration_number,
		bypass_duplicacy    : true,
	};

	return payload;
};

function useUpdateLeadOrganization({
	leadsData = {},
	refetchList = () => {},
	task = {},
	shipment_data = {},
	setConsigneeId = () => {},
	setStep = () => {},
}) {
	const { apiTrigger = () => {} } = useUpdateShipmentPendingTask({ successMessage: 'Updated Successfully' });

	const [{ loading }, trigger] = useRequest({
		url    : '/update_lead_organization',
		method : 'POST',
	}, { manual: true });

	const updateLeadOrganization = async (values) => {
		try {
			const payload = getFormattedPayload({ values, leadsData });

			const res = await trigger({ data: payload });

			if (res?.data?.organization_id) {
				const updatePendingTaskPayload = {
					id     : task?.id,
					tags   : ['0'],
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

				setStep(0);
			} else {
				refetchList();
			}

			Toast.success('Successful');
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		updateLoading: loading,
		updateLeadOrganization,
	};
}

export default useUpdateLeadOrganization;
