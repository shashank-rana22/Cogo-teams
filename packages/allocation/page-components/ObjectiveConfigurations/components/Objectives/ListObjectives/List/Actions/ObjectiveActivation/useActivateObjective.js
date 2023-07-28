import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useActivateObjective = (props) => {
	const { objectiveId, setShowActionModal } = props;

	const [activationDate, setActivationDate] = useState(new Date());

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/objective_activation_date',
		method  : 'POST',
		authkey : 'post_allocation_objective_activation_date',
	}, { manual: true });

	const onSetActivation = async () => {
		try {
			const payload = { objective_id: objectiveId, activate_at: activationDate };

			await trigger({ data: payload });

			setShowActionModal({});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return {
		loading,
		onSetActivation,
		activationDate,
		setActivationDate,
	};
};

export default useActivateObjective;
