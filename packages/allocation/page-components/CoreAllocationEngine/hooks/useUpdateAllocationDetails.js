import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import getUpdateDetailsControls from '../configurations/get-details-update-controls';

const useUpdateAllocationDetails = ({ stakeholderDetail, setStakeholderDetail, listRefetch }) => {
	const controls = getUpdateDetailsControls(stakeholderDetail);

	const defaultValues = {
		stakeholder_id: stakeholderDetail.stakeholder_id || '',
	};

	const formProps = useForm({
		defaultValues,
	});

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/detail_stakeholder',
		method  : 'POST',
		authkey : 'post_allocation_detail_stakeholder',
	}, { manual: true });

	const onSave = async (values = {}) => {
		try {
			const payload = {
				id: stakeholderDetail.allocation_detail_id,
				...values,
			};

			await trigger({
				data: payload,
			});

			setStakeholderDetail({});

			listRefetch();

			Toast.success('Stakeholer updated succesfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onSave,
		formProps,
		controls,
		loading,
	};
};

export default useUpdateAllocationDetails;
