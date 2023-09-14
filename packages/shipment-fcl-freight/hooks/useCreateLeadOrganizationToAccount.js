import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import useUpdateShipmentPendingTask from './useUpdateShipmentPendingTask';

const getFormattedPayload = ({ leadsData = {}, checkList = [] }) => {
	const payload = {
		lead_organization_id : leadsData?.id,
		lead_user_id         : checkList,
	};

	return payload;
};

function useCreateLeadOrganizationToAccount({
	setStep = () => {},
	setConsigneeShipperId = () => {},
	leadsData = {},
	task = {},
}) {
	const [checkList, setCheckList] = useState(null);

	const { apiTrigger = () => {} } = useUpdateShipmentPendingTask({ successMessage: 'Updated Successfully' });

	const [{ loading }, trigger] = useRequest({
		url    : '/create_lead_organization_to_account',
		method : 'POST',
	}, { manual: true });

	const createLeadOrgAccount = async () => {
		try {
			const payload = getFormattedPayload({ leadsData, checkList });

			const res = await trigger({ data: payload });

			if (res.data) {
				setConsigneeShipperId(res?.data?.organization_id);
			}

			const updatePendingTaskPayload = {
				id     : task?.id,
				tags   : ['1'],
				status : 'pending',
			};

			await apiTrigger({ ...updatePendingTaskPayload });

			setStep('1');
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		createLoading: loading,
		checkList,
		setCheckList,
		createLeadOrgAccount,
	};
}

export default useCreateLeadOrganizationToAccount;
