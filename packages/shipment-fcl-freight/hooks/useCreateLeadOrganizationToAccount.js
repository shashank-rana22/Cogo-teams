import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import useUpdateShipmentPendingTask from './useUpdateShipmentPendingTask';

function useCreateLeadOrganizationToAccount({
	setStep = () => {},
	setConsigneeShipperId = () => {},
	listLeadsData = {},
	task = {},
}) {
	const [checkList, setCheckList] = useState(null);

	const { apiTrigger = () => {} } = useUpdateShipmentPendingTask({ successMessage: 'Updated Successfully' });

	const [{ loading }, trigger] = useRequest({
		url    : '/create_lead_organization_to_account',
		method : 'POST',
	}, { manual: true });

	const createLeadOrgAccount = async ({ payload }) => {
		try {
			const res = await trigger({ data: payload });

			if (res.data) {
				setConsigneeShipperId(res?.data?.organization_id);
			}

			await apiTrigger({ id: task?.id, tags: ['1'], status: 'pending' });

			setStep('1');
		} catch (error) {
			toastApiError(error);
		}
	};

	const onVerify = () => {
		const PAYLOAD = {
			lead_organization_id : listLeadsData?.id,
			lead_user_id         : checkList,
		};

		createLeadOrgAccount({ payload: PAYLOAD });
	};

	return {
		createLoading: loading,
		checkList,
		setCheckList,
		onVerify,
		createLeadOrgAccount,
	};
}

export default useCreateLeadOrganizationToAccount;
