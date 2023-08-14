import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const MAX_LENGTH = 2;

const useActivateObjective = (props) => {
	const { objectiveId, setShowActionModal, refetch } = props;

	const formState = useForm({
		defaultValues: {
			activation_date: new Date(),
		},
	});

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/objective_activation_date',
		method  : 'POST',
		authkey : 'post_allocation_objective_activation_date',
	}, { manual: true });

	const onSetActivation = async (values) => {
		const { activation_date, communication_details, communication_operator } = values || {};

		try {
			const payload = {
				objective_id           : objectiveId,
				activate_at            : activation_date,
				is_email_required      : !!communication_details?.includes('is_email_required'),
				is_mobile_required     : !!communication_details?.includes('is_mobile_required'),
				communication_operator : communication_details?.length === MAX_LENGTH
					? communication_operator : undefined,
			};

			await trigger({ data: payload });

			setShowActionModal({});

			refetch();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return {
		loading,
		onSetActivation,
		formState,
	};
};

export default useActivateObjective;
